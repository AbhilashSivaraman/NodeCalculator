# Node Calculator Setup Instructions

This README provides step-by-step instructions to set up the **Node Calculator** application, including both the backend and frontend, on an EC2 instance. Follow these steps carefully to ensure everything is configured correctly.

---

## Backend Setup

### Switch to Superuser Mode
```bash
sudo su
```

### Install Required Software
```bash
sudo yum install -y nodejs
sudo yum install -y httpd
sudo yum install -y git
```

### Verify Installations
```bash
npm -v      # Check Node.js version
node -v     # Check npm version
git --version  # Check Git version
```

### Clone the Repository
```bash
cd /tmp
git clone https://github.com/AbhilashSivaraman/NodeCalculator.git
```

### Move Backend Code to Home Directory
```bash
cd NodeCalculator
mv calculator-backend /home/ec2-user
```

### Install Dependencies and Run the Backend
```bash
cd /home/ec2-user/calculator-backend/
npm install
node index.js
```

### Test the Backend
Access the backend API at: [https://checkapi.app/](https://checkapi.app/)

---

## Frontend Setup

### Switch to Superuser Mode
```bash
sudo su
```

### Navigate to Frontend Code Directory
```bash
cd /tmp/NodeCalculator/calculator-frontend/
```

### Edit the Axios Base URL
- Open the appropriate file containing the Axios configuration.
- Replace the placeholder URL with your instance's public IP address.

Example:
```javascript
axios.defaults.baseURL = 'http://<YOUR_INSTANCE_IP>/api';
```

### Install Dependencies
```bash
npm install
npm install react-scripts
```

### Build the Frontend
```bash
npm run build
```

### Deploy the Build to Apache
```bash
cp -r build/* /var/www/html/
```

### Configure Apache for Proxy
Edit the Apache configuration file:
```bash
nano /etc/httpd/conf/httpd.conf
```
Add the following configuration at the end of the file:
```apache
<VirtualHost *:80>
    ServerName <YOUR_INSTANCE_PUBLIC_IP>

    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api
</VirtualHost>
```
Replace `<YOUR_INSTANCE_IP>` with your instance's public IP address.

### Restart Apache
```bash
sudo systemctl restart httpd
service httpd restart
```

---

## Notes
- Ensure all dependencies are installed and up-to-date.
- Confirm that your instance's security group allows inbound traffic on port 80.
- After setup, access the application through your instance's public IP address in a browser.

Enjoy using My Node Calculator application!