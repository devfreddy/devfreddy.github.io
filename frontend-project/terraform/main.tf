terraform {
  required_version = ">= 1.0"

  required_providers {
    dash0 = {
      source  = "dash0hq/dash0"
      version = "~> 1.4.0"
    }
  }
}

provider "dash0" {
  # Authentication token should be provided via DASH0_AUTH_TOKEN environment variable
  # or via the auth_token argument below
  # auth_token = var.dash0_auth_token

  # Optional: specify the API endpoint if using a custom instance
  # endpoint = var.dash0_endpoint
}
