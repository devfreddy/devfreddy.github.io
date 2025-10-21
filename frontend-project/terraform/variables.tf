variable "dash0_auth_token" {
  description = "Dash0 API authentication token (reads from DASH0_AUTH_TOKEN env var)"
  type        = string
  sensitive   = true
  default     = ""
}

variable "dash0_url" {
  description = "Dash0 API endpoint (set via DASH0_URL environment variable)"
  type        = string
  default     = "https://api.us-west-2.aws.dash0.com"
}

variable "dataset" {
  description = "Dash0 dataset name where resources will be created"
  type        = string
  default     = "devfreddycom"
}

variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "frontend-project"
}

variable "team_name" {
  description = "Team name for resource organization"
  type        = string
  default     = "frontend-team"
}
