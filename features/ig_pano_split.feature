Feature: Slice original image into 1080x1080 images successfull?
    User wants to split up an panorame image into smaller images with an resolution of 1080x1080 pixels.

    Scenario: Images has successfully been split into smaller images.
        Given image has successfully been split into smaller images
        When user chooses action split original image into smaller images
        Then user should see a "success message"

     Scenario: Images has not successfully been split into smaller images
        Given image has not successfully been split into smalle images
        When user chooses action split into smaller images
        Then user should see a "warning message"

