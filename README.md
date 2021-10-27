# HomeBudget

Instalation:
  
  clone repository:
  
    git clone git@github.com:PawelWisn/HomeBudget.git
    
  run project:
  
    sudo docker-compose up --build
    
  application is reachable:
  
    http://localhost:81/
    
    
    
  to run backend tests enter the container using:
  
    sudo docker exec -t -i homebudget_backend_1 bash
  
  and start tests using:
  
    python3 manage.py test
    
    
    
  REMARKS:
  
    - Client does not hangle pagination, but it is available by adding query parameters limit and offset (for example /budget/?limit=2&offset=1)
