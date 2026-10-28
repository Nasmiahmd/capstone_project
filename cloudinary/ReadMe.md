## ADMIN -> DB (Only work with Datas not with assets)
So that we use Cloud Storage
    - will give us two things
        1. Image URL -> this URL stored on DB
        2. Unique ID (In cloudinary it's called cloudinary ID)

## DELETION Process
If we wants to delete the asset then we have to delete it it from two places 
    1. from DB (That URL)
    2. From Cloud Storage - here ne need that unique id to delete it


## Setup
    -- npm i cloudinary
    -- npm i multer (i't primarly used for uploading file like PDFs, videos, Images)
    -- npm i ioredis bullmq