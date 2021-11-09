Feature: Convert image to low poly art successfull?
    User wants to convert an image to low poly art.

    Scenario: Images has successfully been converted to low poly art.
        Given image has successfully been converted to low poly art
        When user chooses action convert to low poly art
        Then user should see a "success message"

     Scenario: Images has not successfully been converted to low poly art.
        Given image has not successfully been converted to low poly art
        When user chooses action convert to low poly art
        Then user should see a "warning message"

