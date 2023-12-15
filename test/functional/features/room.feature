Feature: Operation for rooms
    Run operation on rooms

    Scenario: Create a room
        When I POST "/rooms" with
        """
            {
                "name": "Pepsi",
                "description": "History of Coca 2"
            }
        """
        Then response status is "201"
        
    Scenario: Get rooms
        When I GET "/rooms"
        Then response status is "200"