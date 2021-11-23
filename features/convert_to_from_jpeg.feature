Feature: Convert image to/from jpeg successfull?
    User wants to convert an image to/from jpeg.

    Scenario: Images has successfully been converted to/from jpeg.
        Given image has successfully been converted to/from jpeg
        When user chooses action convert to/from jpeg
        Then user should see a "success message"

     Scenario: Images has not successfully been converted to/from jpeg.
        Given image has not successfully been converted to/from jpeg
        When user chooses action convert to/from jpeg
        Then user should see a "warning message"