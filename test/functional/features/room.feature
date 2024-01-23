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

    Scenario: Create a room
        When I POST "/rooms" with
        """
            {
                "name": "Pepsi"
            }
        """
        Then response status is "400"

    Scenario: Gets rooms
        When I GET "/rooms"
        Then response status is "200"

    Scenario: Delete a room
        Given I have a room named "Pepsi"
        When I DELETE "/rooms/Pepsi"
        Then response status is "200"


    