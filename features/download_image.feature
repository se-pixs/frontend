Feature: Download image successfully?
  User wants to download image to local filesystem.

  Scenario: Download of image was successful
    Given a image is uploaded to the server
    And a image has been manipulated
    When user presses download button
    Then user should be able to download the image successfully
    And user should see message "downloaded successfully"

  Scenario: No image is uploaded
    Given no image is uploaded to the server
    When user presses download button
    Then user should not be able to download the image successfully
    And user should see message "failed to download image"

  Scenario: Image is not manipulated
    Given a image is uploaded to the server
    And the image has not been manipulated
    When user presses download button
    Then user should not be able to download the image successfully
    And user should see message "failed to download image"