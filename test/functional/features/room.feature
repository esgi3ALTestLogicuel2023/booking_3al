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
    
    Scenario: Wrong data
        When I POST "/rooms" with
        """
            {
                "title": "Lipton",
                "description": "History of tea"
            }
        """
        Then response status is "400"

    Scenario: Delete a room with id
        Given I have a room named "tesla"
        When I DELETE "/rooms"
        Then response status is "200"