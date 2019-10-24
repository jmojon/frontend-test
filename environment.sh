/bin/bash

set -x

echo "TICMATE DESKTOP"
echo "cd /var/www/frontend-test" >> ~/.bash_profile
echo "npm start" >> ~/.bash_profile
echo "#################################################################################"
sudo apt-get update
sudp apt-get -y upgrade
echo "#################################################################################"
sudo apt-get install -y git build-essential
echo "#################################################################################"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
echo "#################################################################################"
sudo apt-get install -y nodejs
echo "#################################################################################"
cd /var/www/frontend-test
echo "#################################################################################"
mkdir /var/www/frontend-test/node_modules
ln -s /var/www/frontend-test/node_modules /home/vagrant/
echo "#################################################################################"
sudo npm install
echo "#################################################################################"
