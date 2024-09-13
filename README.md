# Borderless 📄

## Getting started

### Start the server

1. `cd server` from the root directory.
2. Create a `.env` file with the variables provided.
3. `npm i`
4. `npm run dev`

### Start the client

1. `cd client` from the root directory.
2. `npm i`
3. `npm start`

## Requirements

### User stories

- [x] As a user I want to upload an image of my passport.
- [x] I want to be able to extract the DoB and expiry date from my uploaded passport.
- [x] (Stretch) I want my passport images to be saved so I can return to the app when I need the data.

### Acceptability criteria

- [x] POST `/file` where I can upload a file.
  - [x] S3 service that persists the image.
- [x] GET `/:key` where I can get the image URL and extracted text.
  - [x] Get signed URL from S3.
  - [x] Service to extract text from document.
- [x] GET `/file` to return all of the uploaded files.
- [x] A create-react-app
  - [x] User can upload a file.
  - [x] User can see list of uploaded files.
  - [x] User can click on an uploaded file to get more data.
  - [x] User sees an error message if the image is incorrect or blurry.

## Services

Further explanation for the choices in the process section.

- AWS S3 to persist images.
- [OpenAI Vision](https://platform.openai.com/docs/guides/vision) to extract text.
- ~~AWS Textract to extract text.~~
- ~~[OpenAI Files](https://platform.openai.com/docs/api-reference/files) to persist images.~~

## Process

A little story telling if you are interested :).

### First thoughts

- Likely the most time consuming part of the task will be setup and integration with AWS.
- Is there an alternative to S3 and Textract?

### Initial Decisions

- I'm a fan of the OpenAI API documentation and was excited to see that file uploads in Files has a request parameter to specify the file was for use with Vision `purpose: "fine-tune"`.
- I know that text extraction using OpenAI's Vision is very powerful and likely much simpler to use than Textract.

### Challenges

- After building the OpenAI Vision service, I found two things:
  - The File API could not download a file or provide a URL.
  - The Vision API could not interact with the Files. Gotcha!
- I then switched to using AWS S3.
- I still wanted to use OpenAIs vision API. However, I was being rate limited.
- I'd tested Textract from the CLI and was not a fan. Eventually I managed to fix the issue with the rate limits.

### Lessons Learnt

- AWS free tier is generous.
- Be careful when making assumptions (that there was an integration between OpenAI's File and Vision APIs).
- Textract is becoming redundant for this use case with the new tools we have available.

## Improvements

- UI: I didn't have much time to spend on the components. I'd use Tailwind and [ShadCN](https://ui.shadcn.com/) components.
- Validation and error handling: verify the user is uploading the correct file type and image on both the FE and BE.
- Improved error handling if the image is blurry or incorrect so the user knows to re-upload an image.
- Database: persist the extracted text in a db so we only need to call the Vision API once
- User profiles and auth: passport data is sensitive. Likely we would only want the user to see their own passport uploads.
