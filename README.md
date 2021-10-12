# HomeBudget

Instalation on linux:
  
  clone repository:
  
    git clone git@github.com:PawelWisn/HomeBudget.git
    
  run project:
  
    sudo docker-compose up --build
    
  to run backend tests enter the container using:
  
    sudo docker exec -t -i homebudget_backend_1 bash
  
  and start tests using:
  
    python3 manage.py test
