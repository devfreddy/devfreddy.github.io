# Terraform Configuration for Frontend Project Observability

This Terraform configuration manages observability resources in Dash0 for the frontend project, including dashboards, checks, synthetic monitoring, and custom views.

## Prerequisites

1. **Terraform**: Install [Terraform](https://www.terraform.io/downloads.html) (>= 1.0)
2. **Dash0 Account**: Create an account at [Dash0](https://dash0.com)
3. **API Token**: Generate an API authentication token from your Dash0 account

## Setup

### 1. Set Environment Variables

Configure your Dash0 credentials as environment variables:

```bash
export DASH0_AUTH_TOKEN="auth_your-token-here"
export DASH0_URL="https://api.us-west-2.aws.dash0.com"
```

**Note:** These environment variables are required before initializing or applying Terraform.

### 2. Initialize Terraform

```bash
cd terraform
terraform init
```

### 3. Customize Variables

Edit `variables.tf` or create a `terraform.tfvars` file to customize:

- `dataset`: Dash0 dataset name where resources will be created (default: "default")
- `environment`: Deployment environment (dev, staging, production)
- `project_name`: Your project name
- `team_name`: Your team name

### 4. Update YAML Configurations

The resource configurations are defined in YAML files organized by type:

- **Dashboards:** `dashboards/main-dashboard.yaml`
- **Check Rules:** Defined inline in `resources.tf`
- **Synthetic Checks:** `synthetic-checks/api-health.yaml`, `synthetic-checks/frontend-availability.yaml`
- **Views:** `views/performance-view.yaml`, `views/errors-view.yaml`

Customize these YAML files based on your requirements before applying.

### 5. Plan and Apply

View the changes that will be made:

```bash
terraform plan
```

Apply the configuration:

```bash
terraform apply
```

## Resources Included

### Dashboards
- **Main Dashboard** (`dash0_dashboard.main`): Unified observability dashboard with request rate, error rate, and response time (P99) metrics

### Check Rules (Prometheus-based Alerts)
- **Error Rate Check Rule** (`dash0_check_rule.error_rate`): Alerts when error rate exceeds 5% (degraded) or 10% (critical) for 5 minutes
- **Response Time Check Rule** (`dash0_check_rule.response_time`): Alerts when P99 response time exceeds 1000ms (degraded) or 2000ms (critical) for 5 minutes

### Synthetic Checks (Proactive Monitoring)
- **API Health Check** (`dash0_synthetic_check.api_health`): HTTP health check running every 5 minutes from multiple locations (us-oregon, de-frankfurt)
- **Frontend Availability Check** (`dash0_synthetic_check.frontend_availability`): HTTP availability check running every 5 minutes from multiple locations (us-oregon, de-frankfurt, ap-northeast)

### Custom Views
- **Performance View** (`dash0_view.performance`): Span-based view focused on operation performance with duration-based sorting
- **Error View** (`dash0_view.errors`): Span-based view focused on error traces and exceptions

## Customization

### Adding New Check Rules

To add a new check rule, add a resource block to `resources.tf`:

```hcl
resource "dash0_check_rule" "custom_check" {
  dataset         = var.dataset
  check_rule_yaml = <<-EOF
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: custom-check-rule
spec:
  groups:
    - name: Alerting
      interval: 1m0s
      rules:
        - alert: CustomAlert
          expr: your_metric > $__threshold
          for: 5m
          annotations:
            summary: 'Custom alert triggered'
            dash0-threshold-critical: "100"
            dash0-threshold-degraded: "75"
            dash0-enabled: true
          labels: {}
EOF
}
```

### Adding New Dashboards

Create a new YAML file in `dashboards/` and add a resource to `resources.tf`:

```hcl
resource "dash0_dashboard" "custom_dashboard" {
  dataset        = var.dataset
  dashboard_yaml = file("${path.module}/dashboards/custom-dashboard.yaml")
}
```

See `dashboards/main-dashboard.yaml` for examples of Perses Dashboard format.

### Adding New Synthetic Checks

Create a new YAML file in `synthetic-checks/` and add a resource to `resources.tf`:

```hcl
resource "dash0_synthetic_check" "custom_check" {
  dataset              = var.dataset
  synthetic_check_yaml = file("${path.module}/synthetic-checks/custom-check.yaml")
}
```

See `synthetic-checks/api-health.yaml` for examples of Dash0SyntheticCheck format.

### Adding New Views

Create a new YAML file in `views/` and add a resource to `resources.tf`:

```hcl
resource "dash0_view" "custom_view" {
  dataset   = var.dataset
  view_yaml = file("${path.module}/views/custom-view.yaml")
}
```

See `views/performance-view.yaml` for examples of Dash0View format.

## Outputs

After applying the configuration, view the created resources:

```bash
terraform output
```

Key outputs include:
- `dashboard_origin`: Origin ID of the main dashboard
- `check_rule_origins`: Origin IDs of all configured check rules
- `synthetic_check_origins`: Origin IDs of synthetic monitoring checks
- `view_origins`: Origin IDs of custom views

## State Management

The Terraform state is stored locally in `terraform.tfstate`. For production environments, consider using a remote backend:

```hcl
# In backend.tf
terraform {
  backend "s3" {
    bucket         = "your-terraform-state"
    key            = "frontend-project/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

## Updating Resources

To update existing resources:

1. Modify the resource configuration in `resources.tf`
2. Run `terraform plan` to preview changes
3. Run `terraform apply` to apply changes

## Destroying Resources

To remove all managed resources:

```bash
terraform destroy
```

## Common Issues and Solutions

### Dataset Mismatch Error

**Error:** `"Dataset query parameter (devfreddycom) conflicts with dataset in metadata (frontend-project)"`

**Solution:** The `"dash0.com/dataset"` label in YAML metadata must match the `dataset` parameter passed to Terraform. This configuration uses `templatefile()` to dynamically inject the dataset variable into YAML files, ensuring consistency:

```yaml
metadata:
  labels:
    "dash0.com/dataset": "${dataset}"
```

This template variable is automatically replaced with the value from `var.dataset` (default: "devfreddycom").

**Key Takeaway:** Always use `templatefile()` when YAML files need to reference Terraform variables like dataset names.

### Invalid Check Rule Expression Error

**Error:** `"The submitted check rule has an invalid expression. Only a single metric name matcher is allowed."`

**Solution:** Dash0 check rules have strict validation requirements:
- ✅ **Allowed:** Simple metric expressions like `dash0_spans > $__threshold`
- ❌ **Not Allowed:** Complex expressions with multiple matchers like `sum(increase({service_name = "...", otel_span_status_code = "ERROR"}[5m]))`

Keep check rule expressions minimal with a single metric name and threshold comparison.

**Key Takeaway:** Start with simple metric expressions in check rules. Complex filtering should be done in dashboards or views instead.

### Resource Type Names

Ensure you're using the correct Dash0 resource type names:
- ✅ `dash0_dashboard` (not `dash0_dashboards`)
- ✅ `dash0_check_rule` (not `dash0_check`)
- ✅ `dash0_synthetic_check`
- ✅ `dash0_view` (not `dash0_views`)

All resources require `dataset` and a `*_yaml` argument containing the resource definition.

## Troubleshooting

### Authentication Errors

- Verify `DASH0_AUTH_TOKEN` is set correctly: `echo $DASH0_AUTH_TOKEN`
- Verify `DASH0_URL` is set correctly: `echo $DASH0_URL`
- Ensure the token has appropriate permissions in Dash0
- Token format should be `auth_...`

### Resource Creation Failures

- Review the error message in the Terraform output
- Verify YAML syntax in configuration files
- Check that dataset name exists in your Dash0 instance
- Ensure resource names are unique within your dataset

### YAML Parsing Errors

- Validate YAML syntax: use an online YAML validator
- Check indentation (spaces, not tabs)
- Ensure special characters are properly quoted

### State Issues

If you encounter state issues, you can refresh:

```bash
terraform refresh
```

### Resource Import

If you need to import existing Dash0 resources into Terraform:

```bash
terraform import dash0_dashboard.main "dataset_name,dashboard_origin_id"
terraform import dash0_check_rule.error_rate "dataset_name,rule_origin_id"
terraform import dash0_synthetic_check.api_health "dataset_name,check_origin_id"
terraform import dash0_view.performance "dataset_name,view_origin_id"
```

## Documentation

- [Dash0 Terraform Provider Documentation](https://registry.terraform.io/providers/dash0hq/dash0/latest/docs)
- [Dash0 Terraform Provider (Registry)](https://registry.terraform.io/providers/dash0hq/dash0/)
- [Dash0 Integration Guide](https://www.dash0.com/hub/integrations/int_terraform/overview)
- [Terraform Documentation](https://www.terraform.io/docs/)

## Support

For issues with the Terraform provider, visit:
- [Dash0 Terraform Provider GitHub](https://github.com/dash0hq/terraform-provider-dash0)
- [Dash0 Support](https://dash0.com/support)
