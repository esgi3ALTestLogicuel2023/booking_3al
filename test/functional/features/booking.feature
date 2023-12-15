Feature: Operation on booking
    Run operations on bookings

      Scenario: Create a booking
        When I POST "/bookings" with
        """
           {
            "startTime": "2023-12-15T12:42:57+01:00",
            "endTime": "2023-12-15T13:42:57+01:00",
            "room": "2306eb2f-fb0d-488f-b74c-f2a969d94cf0",
            "description": "My journey",
            "title": "My booking",
            "userId": "4f5a7cc9-bcfc-47e1-8050-9c4f90b84a5b"
            }
        """
        Then response status is "201"