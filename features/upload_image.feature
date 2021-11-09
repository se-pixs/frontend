Feature: Upload image successfully?
  User wants to upload image to the server.

  Scenario: Image has valid file format
    Given image is in format <validFormat>
    When user drags image in into input field
    Then user should see a "progress bar"
    
    Examples: Image format
      | validFormat |
      | PNG         |
      | JPEG        |
  
  Scenario: Image has invalid file format
    Given image is in format <invalidFormat>
    When user drags image in into input field
    Then user should see a "warning popup"
    
    Examples: Image format
      | invalidFormat |
      | GIF           |
      | SVG           |
