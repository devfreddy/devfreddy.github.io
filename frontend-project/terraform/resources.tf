# ============================================================================
# DASHBOARD
# ============================================================================
# Main observability dashboard for the frontend project
resource "dash0_dashboard" "main" {
  dataset        = var.dataset
  dashboard_yaml = file("${path.module}/dashboards/main-dashboard.yaml")
}


# ============================================================================
# CHECK RULES - Threshold-based alerts
# ============================================================================
# Check rule for high error rate
resource "dash0_check_rule" "error_rate" {
  dataset         = var.dataset
  check_rule_yaml = <<-EOF
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: frontend-project-error-rate
spec:
  groups:
    - name: Alerting
      interval: 1m0s
      rules:
        - alert: HighErrorRate
          expr: dash0_spans > $__threshold
          for: 5m
          keep_firing_for: 0s
          annotations:
            summary: 'High error rate detected for ${var.project_name}: {{$value|printf "%.2f"}}%'
            description: 'Error rate exceeded threshold for ${var.project_name}: {{$value|printf "%.2f"}}%'
            dash0-threshold-critical: "10"
            dash0-threshold-degraded: "5"
            dash0-enabled: true
          labels: {}
EOF
}

# Check rule for slow response times
resource "dash0_check_rule" "response_time" {
  dataset         = var.dataset
  check_rule_yaml = <<-EOF
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: frontend-project-response-time
spec:
  groups:
    - name: Alerting
      interval: 1m0s
      rules:
        - alert: HighResponseTime
          expr: dash0_spans > $__threshold
          for: 5m
          keep_firing_for: 0s
          annotations:
            summary: 'High response time (p99) for ${var.project_name}: {{$value|printf "%.2f"}}ms'
            description: 'P99 response time exceeded threshold for ${var.project_name}: {{$value|printf "%.2f"}}ms'
            dash0-threshold-critical: "2000"
            dash0-threshold-degraded: "1000"
            dash0-enabled: true
          labels: {}
EOF
}


# ============================================================================
# SYNTHETIC CHECKS - Proactive monitoring
# ============================================================================
# Synthetic check for API health
resource "dash0_synthetic_check" "api_health" {
  dataset              = var.dataset
  synthetic_check_yaml = file("${path.module}/synthetic-checks/api-health.yaml")
}


# ============================================================================
# VIEWS - Custom groupings and perspectives
# ============================================================================
# Performance-focused view
resource "dash0_view" "performance" {
  dataset   = var.dataset
  view_yaml = templatefile("${path.module}/views/performance-view.yaml", {
    dataset = var.dataset
  })
}

# Error-focused view
resource "dash0_view" "errors" {
  dataset   = var.dataset
  view_yaml = templatefile("${path.module}/views/errors-view.yaml", {
    dataset = var.dataset
  })
}
