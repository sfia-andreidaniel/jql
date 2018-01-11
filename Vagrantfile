Vagrant.require_version ">= 1.8.5"

Vagrant.configure("2") do |config|

  #if this vagrant machine is depending on a plugin,
  #then place it here
  #
  #unless Vagrant.has_plugin?("myplugin")
  #  raise 'the "myplugin" plugin is not installed! please install it!'
  #end;

  config.vm.box = "sfia-andreidaniel/ubuntu-edge"
  config.vm.box_check_update = false
  config.vm.box_version = ">= 0.7.3"

  # http
  config.vm.network "forwarded_port", guest: 80, host: 80

  # https
  config.vm.network "forwarded_port", guest: 443, host: 443

  # mysql
  config.vm.network "forwarded_port", guest: 3306, host: 3306

  # sphinx
  config.vm.network "forwarded_port", guest: 3307, host: 3307

  config.vm.synced_folder ".", "/var/www",
    create: true, group: "www-data", owner: "www-data"

  # if this line raise you a error, please update your vagrant version.
  config.vm.hostname = "jql"

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = false

    # 1GB ram
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL

      # restart network
      service networking restart

      # configure apache2
      cp /var/www/vagrant/etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf \
         && service apache2 restart

  SHELL

end