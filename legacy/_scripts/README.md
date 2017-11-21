# Logo Processing

This directory contains utilities for reproducibly creating logo assets for use
in the Resonant website.

## `circular-logo.sh`

The shell script `circular-logo.sh` retrieves an item from data.kitware.com,
then modifies it by shrinking the image, embedding it in white padding out to a
size of 225x225, which is appropriate for the Resonant website's usage of
circular mattes for project logos.

To use this script, you must have a Girder API key and set the environment
variable `GIRDER_API_KEY` to it. Then, invoke the script with two arguments: an
item ID representing the 256x256 logo you want, and a filename to write the
output to.

Because Girder returns results in JSON, a helper script, `extract-key.py`, is
used to extract the key text from the initial JSON results.

The collection holding the logo assets can be found at
https://data.kitware.com/#folder/5840a4bc8d777f5cdd826ea3. To gain access to
this collection, talk to Roni.

Once you run this script for a particular logo, you can update the existing logo
file by copying to `/img/team` within this repository and committing the file
change.
