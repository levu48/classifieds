//import pdfKit from 'pdfkit';
//var pdfKit = require('pdfkit');

Pdf = React.createClass({

        
    mixins: [ReactMeteorData],
    
    getMeteorData() {
        let cats = Utils.flattenCategories(AppObj.categories);

        return {
            posts: Posts.find().fetch(),
            hairNailsPosts: Posts.find({category: 'hair-nails'}).fetch(),
            pcats: cats.map((cat) => {
                    cat.posts = Posts.find({category: cat._id}).fetch();
                    return cat;
                })
        }
    },
    
    getCategory(pcats, catId) {
        let tmp = this.data.pcats.filter(function(cat) {
                if (cat._id === catId) return true;
                else return false;
            });
        if (!tmp || tmp.length === 0 ) return null;
        return tmp[0];    
    },
    
    print(category) {
        const style = {
            columnGap: 20,
            fontSize: 7
        };
        
        const bannerStyle = {
            fontSize: 96,
            bold: true,
        };
        
        const volumneStyle = {
            fontSize: 7,
            alignment: "right"
        };
        
        const catHeaderStyle = {
            fontSize: 10,
            alignment: "center",
            bold: true,
            background: 'black',
            color: 'white'
        };
        
        let posts =[];
        let cat = null;
        if (category === 'all') {
            let tmp = this.data.pcats.map(function(cat) {
                    let p = cat.posts.map(function(post) {
                            return post.description.trim() + "\n ";
                        });
                    
                    if (p[0] && typeof p[0] === 'string') 
                        p[0] = "\n" + p[0];
                        
                    p.unshift({
                            text: "  " + cat.name + "  \n",
                            style: catHeaderStyle
                        });
                    return p; 
                });
            console.log(tmp);
            for (let i=0; i<tmp.length; i++) {
                for (let j=0; j<tmp[i].length; j++) {
                    posts.push(tmp[i][j]);
                }
            };
            
        } else {
            cat = this.getCategory(this.data.pcats, category);
            if (!cat) {
                console.log("there is no such category");
                return;
            }
        
            posts = cat.posts;
            //posts.forEact((post) => post.description = post.description.trim + "\n ");
        }
                
        const line  =  [
                {
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 100,
                    y2: 5,
                    lineWidth: 0.5
                }
            ];
            
        let contents = posts.map((post) => {
            if (post.description) {
                return post.description.trim() + "\n ";
            } else {
                return post;
            }
        });
        
        contents = contents.filter(function (post, index, array) {
            if (post === "This is the description for this post!\n ") {
                return false;
            }
            return true;
        });        
        let num = 4; // number of columns
        let fac = Math.floor(contents.length / num);
        let cols = [];
        let count = 0;
        
        for (let i=0; i<contents.length; i++) {
            let min = fac*count;
            let max = fac*(count+1);
            
            if (i >= min && i < max) {
                cols[count] = cols[count] ? cols[count] : [];
                if (typeof contents[i] === 'object') {
                    cols[count].push(contents[i]);
                } else { 
                    cols[count].push({ text: contents[i] + "\n"});
                    //cols[count].push({ canvas: line });
                }
                
            } else if (i > max ) {
                count++;
            }
        }
        
        let result = {
            alignment: 'justify',
            columns: []
        };
        
        for (let i=0; i<cols.length; i++) {
            result.columns[i] = { text: cols[i] };
        }
        


        
        let dd = {
            header2: 'BanMua.US',
            footer2: {
                columns: [
                    'BánMua.US',
                    { text: "" + Date(), alignment: 'right'}
                ]
            },
            content: [
                {
                    text: "BánMua.US",
                    text2: "Hair & Nails",
                    style: bannerStyle
                },
                {
                    text: "Vol 16.01.29, " + Date() + "\n\n",
                    style: volumneStyle
                },
                
                result
            ], 
            defaultStyle: style
        };
        
        console.log(dd);
        pdfMake.createPdf(dd).download();      
    },
    
    printAll() { 
        this.print('all');
    },
    
    printHairNails() { 
        this.print('hair-nails');
    },
    
    printRoomRent() {
        this.print('room-rent');
    },
    
    printTest2() {
        console.log(this.data.pcats);
        let tmp = this.data.pcats.filter(function(cat) {
                if (cat._id === 'for-sale') return true;
                else return false;
            });
        console.log(tmp);
    },
    
    printTest() {
        const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.'; 

        const cont = {
            text: lorem,
            style: {
                    height: 100,
                    width: 465,
                    align: 'justify'
                }
        };
        
        const dd = {
                content: cont
            };
        
        pdfMake.createPdf(dd).download();
    },
        
        
        
        
        
    render() {
        return (
            <div>
                <h1>Pdf Print</h1>
                <MUI.RaisedButton label="print all" onTouchTap={this.printAll} primary={true} />
                <MUI.RaisedButton label="print Hair Nails" onTouchTap={this.printHairNails} primary={true} />
                <MUI.RaisedButton label="print Rooms For Rent" onTouchTap={this.printRoomRent} primary={true} />
                <MUI.RaisedButton label="print Test" onTouchTap={this.printTest} primary={true} />
            </div>
        );
    }
});