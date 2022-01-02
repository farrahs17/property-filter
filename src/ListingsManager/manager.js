import {v4 as uuidv4} from "uuid";
import makeDummies from "./dummies";

export class Listing {
    constructor(name, description, images = [], address, locality, price, bedrooms, bathrooms, carpet, time= null, id = null) {
        this.name = name;
        this.description = description;
        //A list of string paths to the images
        this.images = images;
        this.address = address;
        this.locality = locality;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.carpet = carpet;
        this.time = time || Date.now();
        this.views = 0;
        this.isFavorite = false;
        this.id = id || uuidv4()
    }

    // Returns whether listing is in price range
    byPriceRange(min, max) {
        return (this.price >= min && this.price <= max)
    }

    //Returns whether listing is in locality
    byLocality(area) {
        return (this.locality === area)
    }

    //Returns whether time of creation is in range
    byDate(dateStart, dateEnd) {
        let timeUnix = new Date(this.time).getTime()
        return (timeUnix >= dateStart && timeUnix <= dateEnd)
    }

    //Returns whether listings has X bedrooms
    byBedroom(beds) {
        return (this.bedrooms === beds)
    }

    //Returns whether listing has X bathrooms
    byBathroom(baths) {
        return (this.bathrooms = baths)
    }

    //Increases view count
    view() {
        this.views++
    }

    //Toggles isFavorite
    toggleFavorite() {
        this.isFavorite = !this.isFavorite
    }

    matchId(id) {
        return (this.id === id)
    }
}

//Creates a listing and adds it to the list then stores allListings to the local storage
export function createListing(name, description, images = [], address, locality, price, bedrooms, bathrooms, carpet,time=null,id=null) {
    let listing = new Listing(name, description, images, address, locality, price, bedrooms, bathrooms, carpet,time,id);
    
    allListings.push(listing)
    //Sorts allListings by date added
    allListings = allListings.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime() )

    filteredListings = [...allListings]
    filter(activeFilters)

    //Save allListings to local storage
    let list = JSON.stringify(allListings);
    window.localStorage.setItem('listings', list)
    
}

let allListings = []
let filteredListings = []
let recentListings = []
let activeFilters = { "locality": [], price: [null, null], bedrooms: null, date: null }


///////////////////////Initializing listings arrays////////////////////////
if(!window.localStorage.getItem('listings')){
    makeDummies()
    let d = JSON.stringify(allListings)
    window.localStorage.setItem('listings', d)

} else {
    let d = JSON.parse(window.localStorage.getItem('listings'))
    d.forEach(el=>{
       return createListing(
            el.name,
            el.description,
            el.images,
            el.address,
            el.locality,
            el.price,
            el.bedrooms,
            el.bathrooms,
            el.carpet,
            el.time,
            el.id
        )
    })
}


///////////////////Filters////////////////////

//Filters by price range
export function filterByPrice(start=0, end=getPriceRange()[1]) {
    let priceFilter = []
    if(start!=null && end!=null){
        allListings.forEach(element => {
            if (element.byPriceRange(start, end))
                priceFilter.push(element);
        });
        return priceFilter
    }
    return allListings
}

//Filters by locality
export function filterByLocality(areas=0) {
    let localityFilter = [] 
    if(areas!=0&&areas!=null&&areas[0]!=0){
        areas.forEach(area => {
            allListings.forEach(listing => {
                if (listing.byLocality(area))
                    localityFilter.push(listing)
            })
        })
        return localityFilter
    }
    return allListings

}

//Filters by date
export function filterByDate(weeks= 0) {
    let start =0
    let end = Date.now()
    let week = 86400
    if(weeks!=0 && weeks!=null){
        switch(weeks){
            case "this week":
                start = Date.now().getTime() - week;
                break;
            case "5 weeks":
                start = Date.now().getTime() - (week*5);
                break;
            case "15 weeks":
                start = Date.now().getTime() - (week*15);
                break;
            default:
                break;
        }
        let dateFilter = []
        allListings.forEach(element => {
            if (element.byDate(start, end))
                dateFilter.push(element);
        });
        return dateFilter
    }
    return allListings
}

//Filters by bedrooms
export function filterByBedrooms(beds=0) {
    let bedroomFilter = []
    if(beds!=0 && beds!=null){
        allListings.forEach(element => {
            if (element.byBedroom(beds))
                bedroomFilter.push(element);
        });
        return bedroomFilter
    }
    return allListings
}

export function filter(filters){
    activeFilters = filters

    let localityArr = filterByLocality(filters.locality) 
    let priceArr = filterByPrice(filters.price[0],filters.price[1])
    let arr1 = intersection(localityArr,priceArr)

    let bedroomArr = filterByBedrooms(filters.bedrooms)
    let dateArr = filterByDate(filters.date)
    let arr2 = intersection(bedroomArr,dateArr)

    filteredListings = intersection(arr1,arr2)
}

//////////////Viewing and Favoriting///////////////////

//Increases view count of listing and adds it to the top of recentListings
export function viewListing(id) {
    
    allListings.forEach(listing => {
        if (listing.id === id) {
            listing.view();
            
            recentListings.forEach(recent => {
                if (recent.matchId(id)) {
                    recentListings.splice(recentListings.indexOf(recent), 1);
                }
            })
            recentListings = prepend(listing,recentListings)

        }
    })
}

export function favoriteListing(id) {
    allListings.forEach(listing => {
        if (listing.matchId(id)) {
            listing.toggleFavorite()
        }
    })
}

export function getFilteredListings() {
    return filteredListings
}
export function getAllListings() {
    return allListings
}
export function getRecentListings(){
    return recentListings
}

//Gets all localities from the listings
//Unused
export function getLocalities(){
    let localities = []
    allListings.forEach(listing=>{
        if(!localities.includes(listing.locality))
            localities.push(listing.locality)
    })
    return localities
}

//returns min and max prices from allListings
export function getPriceRange(){
    let prices = allListings.map(x=>x.price)
    let range = [Math.min(...prices),Math.max(...prices)] 
    return range;
}

//////////////Util functions///////////////////////////
function prepend(value, arr){
    let newArray = arr.slice();
    newArray.unshift(value);
    console.log(newArray)
    return newArray;
}

//Creates an intersection from two arrays
export function intersection(arr1,arr2) {
    let set1 = new Set(arr1);
    let set2 = new Set(arr2)
    let intersectionSet = new Set([...set1].filter(x => set2.has(x)));
    return Array.from(intersectionSet);
}
