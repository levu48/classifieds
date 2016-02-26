Utils = {
    getRandomCategory: function () {
        var categories = ['for-sale'];
    	var index = Math.floor(Math.random()*6);
    	return categories[index];
    },
    
    getSiblingCategories: function(catArr, catId) {
        if (!catArr) return null;

        for (let i=0; i<catArr.length; i++) {
            let curr = catArr[i];
            if (curr._id === catId) {
                return catArr;
            } else if (curr.categories) {
                let res = arguments.callee(curr.categories, catId);
                if (res) return res;
            }
        }
        
        return null;
    },
    
    // untested!
    flattenCategories: function(catArr) {
        if (!catArr || catArr.length === 0) return [];
        
        if (catArr[0] && catArr[0].categories) {
            let categories = catArr[0].categories;
            let first =  arguments.callee(categories);  
            let rest = arguments.callee(catArr.slice(1));
            let result = first;
            rest.forEach((c) => result = result.concat(c));
            return result;
                     
        } else {
            let first = catArr.slice(0,1);
            let rest = arguments.callee(catArr.slice(1));
            let result = first;
            rest.forEach((c) => result = result.concat(c));
            return result;
        }
    },
    
    // verify to see if the user owns the document they are working on

    ownsDocument: function (userId, doc) {
        return doc && doc.userId === userId;
    },
    
    merge(obj1, obj2) {
        let obj3 = {};
        for (let att in obj1) { obj3[att] = obj1[att]; }
        for (let att in obj2) { obj3[att] = obj2[att]; }
        return obj3;
    },
    
    contains(arr, obj) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return i;
            }
        }
        return -1;
    },
    
    styles: {
        styleLeft: { textAlign: "left" },
        styleRight: { textAlign: "right", verticalAlign: "bottom" }
    }
    
    
};


//console.log(Utils.flattenCategories(AppObj.categories));

encodeImageFileAsURL = function () {

    var filesSelected = document.getElementById("fileInput").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            // var newImage = document.createElement('img');
            // newImage.src = srcData;

            // document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            // alert("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
            // console.log(srcData);
            $('#preview').attr('src', srcData);
            return srcData;
        };
        fileReader.readAsDataURL(fileToLoad);

    }
};


'use strict';

/**
 * @param {number} distance - distance (km) from the point represented by centerPoint
 * @param {array} centerPoint - two-dimensional array containing center coords [latitude, longitude]
 * @description
 *   Computes the bounding coordinates of all points on the surface of a sphere
 *   that has a great circle distance to the point represented by the centerPoint
 *   argument that is less or equal to the distance argument.
 *   Technique from: Jan Matuschek <http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates>
 * @author Alex Salisbury
*/

getBoundingBox = function (centerPoint, distance) {
  var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
  if (distance < 0) {
    return 'Illegal arguments';
  }
  // helper functions (degrees<–>radians)
  Number.prototype.degToRad = function () {
    return this * (Math.PI / 180);
  };
  Number.prototype.radToDeg = function () {
    return (180 * this) / Math.PI;
  };
  // coordinate limits
  MIN_LAT = (-90).degToRad();
  MAX_LAT = (90).degToRad();
  MIN_LON = (-180).degToRad();
  MAX_LON = (180).degToRad();
  // Earth's radius (km)
  R = 6378.1;
  // angular distance in radians on a great circle
  radDist = distance / R;
  // center point coordinates (deg)
  degLat = centerPoint[0];
  degLon = centerPoint[1];
  // center point coordinates (rad)
  radLat = degLat.degToRad();
  radLon = degLon.degToRad();
  // minimum and maximum latitudes for given distance
  minLat = radLat - radDist;
  maxLat = radLat + radDist;
  // minimum and maximum longitudes for given distance
  minLon = void 0;
  maxLon = void 0;
  // define deltaLon to help determine min and max longitudes
  deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLon = radLon - deltaLon;
    maxLon = radLon + deltaLon;
    if (minLon < MIN_LON) {
      minLon = minLon + 2 * Math.PI;
    }
    if (maxLon > MAX_LON) {
      maxLon = maxLon - 2 * Math.PI;
    }
  }
  // a pole is within the given distance
  else {
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }
  return [
    minLon.radToDeg(),
    minLat.radToDeg(),
    maxLon.radToDeg(),
    maxLat.radToDeg()
  ];
};
