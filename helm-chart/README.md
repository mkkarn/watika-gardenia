🍴 Restaurant App Helm Chart

This Helm chart deploys the Restaurant App microservices into a Kubernetes cluster (EKS recommended). It provides a production‑grade, GitOps‑ready structure for managing deployments, services, ingress, and configuration.

📦 Microservices Included

    Frontend → React app served via Nginx, exposed via ALB/Ingress.

    Menu Service → Provides menu items and categories.

    Cart Service → Manages cart state and persistence.

    Order Service → Handles checkout, order confirmation, and order history.

    Payment Service → Processes payments securely.

    Recommendation Service → Suggests dishes based on user activity.

    Auth Service → Manages login and user sessions.

    Orders Database → Postgres deployed in‑cluster for order persistence.

⚙️ Prerequisites

    Kubernetes cluster (EKS recommended).

    Helm v3 installed.

    AWS Load Balancer Controller configured for Ingress.

    Route 53 hosted zone for your FQDN.

    ACM certificate issued and validated in us-east-1.

🚀 Installation
1. Clone the repo
```
bash
git clone https://github.com/yourorg/restaurant-app-helm.git
cd restaurant-app-helm
```

2. Update values.yaml

    Replace image repositories with your own GHCR/DockerHub paths.

    Adjust resource requests/limits per service.

    Set frontend.externalService: true for ALB exposure.

    Configure ordersDatabase.connectionString.

3. Install chart

```
bash
helm install restaurant-app ./helm-chart -n restaurant --create-namespace
```

4. Verify deployment
```
bash
kubectl get pods -n restaurant
kubectl get svc -n restaurant
kubectl get ingress -n restaurant
```

🌐 Accessing the App

    The frontend service is exposed via ALB Ingress.

    Route 53 alias record points your FQDN to the ALB DNS.

    ACM certificate ensures HTTPS termination.

    Example:
```
bash
curl -v https://www.watika-gardenia.org
```

🔒 Security & Policies

    NetworkPolicies can be enabled per service.

    AuthorizationPolicies can restrict inter‑service communication.

    SecurityContext enabled by default.

    SeccompProfile optional.

📊 Observability

    Optional OpenTelemetry Collector can be enabled.

    Integrates with AWS CloudWatch for metrics/logs.

    Tracing and profiling disabled by default.

🛠️ Customization

    Toggle services on/off in values.yaml.

    Adjust resource requests/limits.

    Swap database backend (Postgres/MySQL).

    Add new microservices by extending values.yaml and templates.

✅ Next Steps

    Configure CI/CD pipeline to push Docker images to GHCR.

    Automate Helm upgrades via GitOps (ArgoCD/Flux).

    Add HPA for autoscaling services.

    Integrate WAF with ALB for security.
