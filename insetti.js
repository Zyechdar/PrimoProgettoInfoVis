const run = function(data){

    // Add IDs to data
    data = data
        .map(function (element, position) {
            element.id = position;
            console.log(element.id);
            return element;
        });

    function pointOnEllipse(d, angle) {
        const x = (d.larghezzaAddome * Math.cos(angle)) + d.horizontalPosition;
        const y = (d.larghezzaAddome * 3 * Math.sin(angle)) + d.verticalPosition + d.larghezzaAddome * 3;
        return [x, y];
    }


    function pointOnCircle(d, angle) {
        const x = (d.larghezzaAddome / 2 * Math.cos(angle)) + d.horizontalPosition;
        const y = (d.larghezzaAddome / 2 * Math.sin(angle)) + d.verticalPosition;
        return [x, y];
    }

    function getSideLength(diagonal) {
        return diagonal / Math.sqrt(2)
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function scegliInsetto(){
        insetto= getRandomInt(0, 9)
        console.log(insetto)
        return insetto
    }
      /* function switchInsetto ( id) {
       
    }  */
    const onClickBug = function (clickedDataItem) {
        id= scegliInsetto()
        while(id== clickedDataItem.id)
            id=scegliInsetto()
        data = data
       
                    addome= clickedDataItem.larghezzaAddome;
                    zampe= clickedDataItem.legLength;
                    occhi= clickedDataItem.eyeDimension;
                    antenne= clickedDataItem.lunghezzaAntenna;
                    clickedDataItem.larghezzaAddome = data[id].larghezzaAddome;
                    clickedDataItem.legLength = data[id].legLength;
                    clickedDataItem.eyeDimension = data[id].eyeDimension;
                    clickedDataItem.lunghezzaAntenna= data[id].lunghezzaAntenna;
                    data[id].larghezzaAddome= addome;
                    data[id].legLength= zampe;
                    data[id].eyeDimension= occhi;
                    data[id].lunghezzaAntenna= antenne;
                    // switchInsetto(id) */
                    
                
        render(data, 4000);
    };        


//Main
    const svg = d3.select("body").append("svg").attr('width', 1500).attr('height', 850);

    let dataSet;


    render(data, 0);

    function render(dataSet, transitionTime) {

        const tx = d3
            .transition()
            .duration(transitionTime);

        const bugs = svg
            .selectAll("g")
            .data(dataSet, function (element) {
                return element.id;
            });

        const enter = bugs.enter();
        const group = enter.append("g");

        bugs
            .exit()
            .remove();

        group
            .append("circle")
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("class", "head")
            .attr('fill', "dark brown")
            .attr('cx', function (d) {
                return d.horizontalPosition;
            })
            .attr('cy', function (d) {
                return d.verticalPosition;
            })
            .attr('r', function (d) {
                return d.larghezzaAddome / 2
            });

        bugs.selectAll('.head')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition
            })
            .attr('cy', function (d) {
                return d.verticalPosition;
            })
            .attr('r', function (d) {
                return d.larghezzaAddome / 2
            });
        //body
        group
            .append("ellipse")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("class", "body")
            .attr('fill', "brown")
            .attr('cx', function (d) {
                return d.horizontalPosition
            })
            .attr('cy', function (d) {
                return d.verticalPosition + d.larghezzaAddome * 3
            })
            .attr('rx', function (d) {
                return d.larghezzaAddome
            })
            .attr('ry', function (d) {
                return d.larghezzaAddome * 3
            })
            .style("cursor", "pointer")
            .on("click", function (target) {
                return onClickBug(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickBug(target, false);
            });

        bugs.selectAll('.body')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition
            })
            .attr('cy', function (d) {
                return d.verticalPosition + d.larghezzaAddome * 3
            })
            .attr('rx', function (d) {
                return d.larghezzaAddome
            })
            .attr('ry', function (d) {
                return d.larghezzaAddome * 3
            });
        //right eye
        group
            .append("circle")
            .attr("class", "right_eye")
            .attr("fill", "white")
            .attr('cx', function (d) {
                return d.horizontalPosition + (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            })
           .style("cursor", "pointer")
           /* .on("click", function (target) {
                return onClickEye(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickEye(target, false);
            }); */

        bugs.selectAll('.right_eye')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition + (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            });

        //left eye
        group
            .append("circle")
            .attr("class", "left_eye")
            .attr("fill", "white")
            .attr('cx', function (d) {
                return d.horizontalPosition - (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            }) 
           .style("cursor", "pointer")
           /* .on("click", function (target) {
                return onClickEye(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickEye(target, false);
            }); */

        bugs.selectAll('.left_eye')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition - (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            });

        //front right leg
        group
            .append("polyline")
            .attr("class", "front_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            }) */
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y - s, x + s, y - d.legLength];
            });

        bugs.selectAll('.front_right_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y - s, x + s, y - d.legLength];
            });

        //front left leg
        group
            .append("polyline")
            .attr("class", "front_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            }) */
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4);
                return [x, y, x - s, y - s, x - s, y - d.legLength];
            });

        bugs.selectAll('.front_left_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4);
                return [x, y, x - s, y - s, x - s, y - d.legLength];
            });


        //middle right leg
        group
            .append("polyline")
            .attr("class", "middle_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            }) */
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition + d.larghezzaAddome, d.verticalPosition + d.larghezzaAddome * 3];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x + d.legLength / 4, y, x + d.legLength / 4 + s, y + s];
            });

        bugs.selectAll('.middle_right_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition + d.larghezzaAddome, d.verticalPosition + d.larghezzaAddome * 3];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x + d.legLength / 4, y, x + d.legLength / 4 + s, y + s];
            });

        //middle left leg
        group
            .append("polyline")
            .attr("class", "middle_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            }) */
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition - d.larghezzaAddome, d.verticalPosition + (d.larghezzaAddome * 3)];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x - d.legLength / 4, y, x - d.legLength / 4 - s, y + s];
            });

        bugs.selectAll('.middle_left_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition - d.larghezzaAddome, d.verticalPosition + (d.larghezzaAddome * 3)];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x - d.legLength / 4, y, x - d.legLength / 4 - s, y + s];
            });

        //back right leg
        group
            .append("polyline")
            .attr("class", "back_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            }) */
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y + s, x + s, y + d.legLength];
            });

        bugs.selectAll('.back_right_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y + s, x + s, y + d.legLength];
            });

        //back left leg
        group
            .append("polyline")
            .attr("class", "back_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            }) */
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x - s, y + s, x - s, y + d.legLength];
            });

        bugs.selectAll('.back_left_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x - s, y + s, x - s, y + d.legLength];
            });

        //right antenna
        group
            .append("polyline")
            .attr("class", "right_antenna")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickAntenna(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickAntenna(target, false);
            }) */
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4)
                return [x, y, x + s, y - s, x + s, y - d.lunghezzaAntenna];
            });

        bugs.selectAll('.right_antenna')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4)
                return [x, y, x + s, y - s, x + s, y - d.lunghezzaAntenna];
            });

        //left antenna
        group
            .append("polyline")
            .attr("class", "left_antenna")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4);
                return [x, y, x - s, y - s, x - s, y - d.lunghezzaAntenna];
            })
            .style("cursor", "pointer")
            /* .on("click", function (target) {
                return onClickAntenna(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickAntenna(target, false);
            });
 */
        bugs.selectAll('.left_antenna')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4);
                return [x, y, x - s, y - s, x - s, y - d.lunghezzaAntenna];
            });
    }

}