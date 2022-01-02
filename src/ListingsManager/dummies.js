import * as Manager from "./manager"

let names = [
    "Abevenue",
    "Minisora",
    "Bolland",
    "Puffington",
    "B.B.Bol",
    "Cratos",
    "Aang Ery Residence",
    "Knowhere",
    "Liverworth",
    "Heartworth",
    "Baseworth",
    "Mangoland"
]

let description = "Lorem ipsum dolor sit."

let images = [
    "https://pyxis.nymag.com/v1/imgs/711/486/d8297fabeda7f1880ef08532befcfe4626-petsfit-outdoor-triangle-cat-house-.rsocial.w1200.jpg",
    "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/06/13/121551.jpg",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cat-house-1523376147.jpg?crop=0.955xw:0.914xh;0,0.0864xh&resize=480:*",
    "https://blythewoodworks.com/wp-content/uploads/2018/11/Cat-Dplx-with-PD.jpg",
    "https://m.media-amazon.com/images/I/711a7pu9WUL._AC_SL1500_.jpg",
    "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2021/9/20/0/Original_Crafty-Lumberjacks_Haunted_Cat_House_13-2_Glue-Facade.jpg.rend.hgtvcom.616.462.suffix/1632171905242.jpeg"
]

let address = [
    "4 Meowtown, Purr District",
    "55th St. Beans, Katnip Province",
    "68 Belly St., Scratchtown"
]

let locality = ["Purr District","Katnip Province","Scratchtown"]

let time = [new Date("2021-05-03"), new Date("2021-10-03"), new Date("2021-12-23"), new Date("2021-05-03")]

function makeDummies(){
    let dummies = names.forEach(name=>{
        return Manager.createListing(
            name,
            description,
            images[Math.floor(Math.random() * images.length)],
            address[Math.floor(Math.random() * address.length)],
            locality[Math.floor(Math.random()*locality.length)],
            Math.floor(Math.random()*100000+10000),
            Math.floor(Math.random()*5+1),
            Math.floor(Math.random()*4+1),
            Math.floor(Math.random()*100+10),
            time[Math.floor(Math.random()*time.length)]
            );
    })
    return dummies
}

export default makeDummies;