# 📊 Node.js Observability Lab

A beginner-friendly project to understand **Observability** in Node.js by integrating **Prometheus**, **Grafana**, **Loki**, and **Winston**.

This repository is intended for **learning purposes only** and demonstrates how metrics and logs flow through a modern monitoring stack.

---

## 🚀 What You'll Learn

- Collect application metrics with Prometheus
- Visualize metrics using Grafana
- Generate structured logs using Winston
- Aggregate logs with Loki
- Monitor response times and request counts
- Understand Counters, Gauges, and Histograms
- Build a complete observability pipeline

---

# 🏗️ Architecture

## Metrics Pipeline

```text
Express App
     │
     ▼
Prometheus Metrics
     │
     ▼
 Prometheus
     │
     ▼
 Grafana Dashboard
```

## Logging Pipeline

```text
Express App
     │
     ▼
 Winston Logger
     │
     ▼
    Loki
     │
     ▼
 Grafana Explore
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Express.js | Backend Application |
| Prometheus | Metrics Collection |
| Grafana | Monitoring Dashboard |
| Loki | Centralized Logging |
| Winston | Logging Library |
| prom-client | Custom Metrics |
| response-time | Request Duration Tracking |
| Docker | Running Prometheus, Grafana & Loki |

---

# 📁 Project Structure

```text
project/
│
├── server.js
├── util.js
├── prometheus-config.yml
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 📚 Topics Covered

- Express Server Setup
- Prometheus Metrics
- Default Node.js Metrics
- Custom Counters
- Histograms
- Response Time Monitoring
- Metrics Endpoint
- Winston Logger
- Loki Integration
- Docker Setup
- Grafana Dashboards
- PromQL Basics
- Load Testing using Autocannon

---

# 📈 Metrics Collected

### Default Metrics

Automatically collected by `prom-client`

- CPU Usage
- Memory Usage
- Heap Statistics
- Event Loop Lag
- Active Handles
- Process Uptime

---

### Custom Metrics

#### Counter

Tracks total requests.

Example:

```text
Total_request_count
```

---

#### Histogram

Tracks request latency.

Example:

```text
http_req_res_time
```

---

# 📝 Logs

Logs are generated using **Winston** and pushed to **Loki**.

Example logs:

```text
INFO  Request came on /
INFO  Request came on /slow
ERROR Database Server Down
WARN Invalid Token
```

These logs can be explored inside **Grafana Explore**.

---

# 📊 Useful Prometheus Queries

### CPU Usage

```promql
rate(process_cpu_user_seconds_total[1m])
```

### Memory Usage

```promql
process_resident_memory_bytes
```

### Event Loop Lag

```promql
nodejs_eventloop_lag_seconds
```

### Total Requests

```promql
Total_request_count
```

### Response Time Histogram

```promql
http_req_res_time_bucket
```

---

# 🔥 Load Testing

Generate traffic using:

```bash
npx autocannon -c 100 -d 60 http://localhost:8000/slow
```

---

# 🧠 Key Observability Concepts

## Counter

Only increases.

Examples:

- Requests
- Errors
- Logins

---

## Gauge

Can increase or decrease.

Examples:

- Memory Usage
- CPU Usage
- Temperature

---

## Histogram

Measures the distribution of values.

Examples:

- Response Time
- Latency
- API Duration

---

# 🖥️ Dashboard

After connecting Prometheus and Loki to Grafana, you can:

- Monitor CPU & Memory
- View Request Count
- Analyze Response Times
- Explore Logs
- Debug Errors
- Observe Application Health

---

# 🎯 Learning Outcomes

By completing this project, you'll understand:

- What observability means
- Difference between monitoring and logging
- How Prometheus scrapes metrics
- How Grafana visualizes data
- Why Loki is used for logs
- How custom metrics work
- How to monitor Node.js applications in production

---

# ⚠️ Disclaimer

This repository was built **for educational purposes** to understand the fundamentals of observability in Node.js.

It is **not intended for production use** and omits production-grade configurations such as authentication, alerting, high availability, security hardening, and scalable deployments.

---

# 📖 References

- Prometheus
- Grafana
- Loki
- Winston
- prom-client
- Express.js

---

## ⭐ If you found this repository helpful, consider giving it a star!
