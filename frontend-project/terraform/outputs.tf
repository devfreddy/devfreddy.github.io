output "dashboard_origin" {
  description = "Origin ID of the main dashboard"
  value       = try(dash0_dashboard.main.origin, null)
}

output "check_rule_origins" {
  description = "Map of check rule origin IDs"
  value = {
    error_rate    = try(dash0_check_rule.error_rate.origin, null)
    response_time = try(dash0_check_rule.response_time.origin, null)
  }
}

output "synthetic_check_origins" {
  description = "Map of synthetic check origin IDs"
  value = {
    api_health = try(dash0_synthetic_check.api_health.origin, null)
  }
}

output "view_origins" {
  description = "Map of custom view origin IDs"
  value = {
    performance = try(dash0_view.performance.origin, null)
    errors      = try(dash0_view.errors.origin, null)
  }
}
