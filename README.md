# imagemin-instant

Minify a folder of images recursively while preserving folder structure.

# Installation

First, make sure you've installed [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/). Then, open a terminal and run:

```
npm install -g imagemin-instant
```

# Usage

Navigate to a folder with images in your terminal. If you want to minify *all* images in the current directory, simply run:
```
imagemin
```

**Note: The original HD images will be overridden!**

If you want to preserve the original images, navigate to the parent directory and run `imagemin` again, but specify an input and an output directory this time:

```
imagemin --in=my-images --out=minified-images
```

# Options

```
--in=dir            // Specify an input directory.
--out=dir           // Specify an output directory.
--quality=50        // The quality of minified PNG files.
```
