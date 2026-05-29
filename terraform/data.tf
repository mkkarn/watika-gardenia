# Fetch your current public IP (used later in SG rules)
data "http" "my_ip" {
  url = "https://checkip.amazonaws.com"
}

# Get the latest Ubuntu 22.04 (Jammy) AMI from Canonical in ap-south-1
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical official AWS account
}

