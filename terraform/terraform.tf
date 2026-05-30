terraform {
  backend "s3" {
    bucket = "watika-terraform-backend-bucket"
    key    = "s3-backend"
    region = "ap-south-1"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.47.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}
