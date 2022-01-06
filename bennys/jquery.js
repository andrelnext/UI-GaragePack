$(document).ready(function () {
    window.addEventListener("message", function (event) {

        switch (event.data.action) {
            case 'OpenBnS':
                initBennysNUI(event.data.config, event.data.vehModifications, event.data.availableModifications, event.data.modTypes, event.data.vname, event.data.isBike)
                CloseBennys()
                break;
        }
    })
})

function CloseBennys() {
    $(document).ready(function () {
        document.onkeyup = function (data) {
            if (data.which == 27) {
                $('#actionmenuBennys').fadeOut(1000)
                $.post("http://rb_garagem/bennysClose")
            }
        }
    })
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

$(document).ready(function () {
    $('#section-cor').click(function () {
            $('.boxes').css('display', 'none');
            $('.color-picker-panel').css('display', 'block');
            $('.info').css('display', 'flex');
        }
    );
    $('#section-Aparência, #section-Customização, #section-Performance, #section-Interior, #section-Rodas, #section-Extras').click(function () {
            $('.color-picker-panel').css('display', 'none');
            $('.info').css('display', 'none');
            $('.boxes').css('display', 'flex');
        }
    );
})


let bennysConfig,
    bennysModTypes,
    bennysAvailableModifications,
    bennysVehModifications,
    bennysVName,
    bennysIsBike;

let bennysTotalPrice = 0;
let changedMods = {};


const bennysCategoriesNames = {
    appearance: "Aparência",
    customization: "Customização",
    performance: "Performance",
    interior: "Interior",
    wheels: "Rodas",
    extras: "Extras",
};

const bennysWheelTypes = [
    "Sport",
    "Muscle",
    "Lowrider",
    "SUV",
    "Off Road",
    "Tuner",
    "Bike",
    "High End",
    "Benny's Original",
    "Benny's Bespoke",
    "Open Wheel",
    "Street",
    "Track",
];

const bennysPaintTypes = [
    "Normal",
    "Metálico",
    "Perolado",
    "Fosco",
    "Metal",
    "Cromado",
];

const bennysWheelColours = [
    {name: "Black", colorindex: 0},
    {name: "Carbon Black", colorindex: 147},
    {name: "Hraphite", colorindex: 1},
    {name: "Anhracite Black", colorindex: 11},
    {name: "Black Steel", colorindex: 2},
    {name: "Dark Steel", colorindex: 3},
    {name: "Silver", colorindex: 4},
    {name: "Bluish Silver", colorindex: 5},
    {name: "Rolled Steel", colorindex: 6},
    {name: "Shadow Silver", colorindex: 7},
    {name: "Stone Silver", colorindex: 8},
    {name: "Midnight Silver", colorindex: 9},
    {name: "Cast Iron Silver", colorindex: 10},
    {name: "Red", colorindex: 27},
    {name: "Torino Red", colorindex: 28},
    {name: "Formula Red", colorindex: 29},
    {name: "Lava Red", colorindex: 150},
    {name: "Blaze Red", colorindex: 30},
    {name: "Grace Red", colorindex: 31},
    {name: "Garnet Red", colorindex: 32},
    {name: "Sunset Red", colorindex: 33},
    {name: "Cabernet Red", colorindex: 34},
    {name: "Wine Red", colorindex: 143},
    {name: "Candy Red", colorindex: 35},
    {name: "Hot Pink", colorindex: 135},
    {name: "Pfsiter Pink", colorindex: 137},
    {name: "Salmon Pink", colorindex: 136},
    {name: "Sunrise Orange", colorindex: 36},
    {name: "Orange", colorindex: 38},
    {name: "Bright Orange", colorindex: 138},
    {name: "Gold", colorindex: 99},
    {name: "Bronze", colorindex: 90},
    {name: "Yellow", colorindex: 88},
    {name: "Race Yellow", colorindex: 89},
    {name: "Dew Yellow", colorindex: 91},
    {name: "Dark Green", colorindex: 49},
    {name: "Racing Green", colorindex: 50},
    {name: "Sea Green", colorindex: 51},
    {name: "Olive Green", colorindex: 52},
    {name: "Bright Green", colorindex: 53},
    {name: "Gasoline Green", colorindex: 54},
    {name: "Lime Green", colorindex: 92},
    {name: "Midnight Blue", colorindex: 141},
    {name: "Galaxy Blue", colorindex: 61},
    {name: "Dark Blue", colorindex: 62},
    {name: "Saxon Blue", colorindex: 63},
    {name: "Blue", colorindex: 64},
    {name: "Mariner Blue", colorindex: 65},
    {name: "Harbor Blue", colorindex: 66},
    {name: "Diamond Blue", colorindex: 67},
    {name: "Surf Blue", colorindex: 68},
    {name: "Nautical Blue", colorindex: 69},
    {name: "Racing Blue", colorindex: 73},
    {name: "Ultra Blue", colorindex: 70},
    {name: "Light Blue", colorindex: 74},
    {name: "Chocolate Brown", colorindex: 96},
    {name: "Bison Brown", colorindex: 101},
    {name: "Creeen Brown", colorindex: 95},
    {name: "Feltzer Brown", colorindex: 94},
    {name: "Maple Brown", colorindex: 97},
    {name: "Beechwood Brown", colorindex: 103},
    {name: "Sienna Brown", colorindex: 104},
    {name: "Saddle Brown", colorindex: 98},
    {name: "Moss Brown", colorindex: 100},
    {name: "Woodbeech Brown", colorindex: 102},
    {name: "Straw Brown", colorindex: 99},
    {name: "Sandy Brown", colorindex: 105},
    {name: "Bleached Brown", colorindex: 106},
    {name: "Schafter Purple", colorindex: 71},
    {name: "Spinnaker Purple", colorindex: 72},
    {name: "Midnight Purple", colorindex: 142},
    {name: "Bright Purple", colorindex: 145},
    {name: "Cream", colorindex: 107},
    {name: "Ice White", colorindex: 111},
    {name: "Frost White", colorindex: 112},
];
let customNames = {
    [14]: [
        "Buzina de Caminhão",
        "Buzina Policial",
        "Buzina de Palhaço",
        "Buzina Musical 1",
        "Buzina Musical 2",
        "Buzina Musical 3",
        "Buzina Musical 4",
        "Buzina Musical 5",
        "Trombone Triste",
        "Buzina Clássica 1",
        "Buzina Clássica 2",
        "Buzina Clássica 3",
        "Buzina Clássica 4",
        "Buzina Clássica 5",
        "Buzina Clássica 6",
        "Buzina Clássica 7",
        "Nota Musical Do",
        "Nota Musical Re",
        "Nota Musical Mi",
        "Nota Musical Fa",
        "Nota Musical Sol",
        "Nota Musical La",
        "Nota Musical Ti",
        "Nota Musical Do (Grave)",
        "Buzina de Jazz 1",
        "Buzina de Jazz 2",
        "Buzina de Jazz 3",
        "Buzina de Jazz Loop",
        "Star Spangled Banner",
        "Star Spangled Banner",
        "Star Spangled Banner",
        "Star Spangled Banner",
        "Buzina Clássica Loop",
        "Buzina Clássica 8",
        "Buzina Clássica Loop 2",
        "Halloween Loop 1",
        "Halloween Loop 2",
        "San Andreas Loop",
        "Liberty City Loop",
        "Loop Festival 1",
        "Loop Festival 2",
        "Loop Festival 3",
        "Street Transmission",
        "Buzina Musical Loop 6",
        "Buzina Musical Loop 7",
        "Buzina Musical Loop 8",
        "Buzina Natalina 1",
        "Buzina Natalina 2",
        "Buzina Natalina 3",
        "Buzina Natalina 4",
        "Buzina Natalina 5",
        "Buzina Natalina 6",
        "Buzina de Corneta Loop 1",
        "Buzina de Corneta 1",
        "Buzina de Corneta Loop 2",
        "Buzina de Corneta 2",
        "Buzina de Corneta Loop 3",
        "Buzina de Corneta 3",
    ],
};

const bennysToggleMods = {
    [18]: "turbo",
    [20]: "tyreSmokeOn",
};

customNames[14][-1] = "Original";

function selectPart(element) {
    let dataPart = element.dataset.idpart

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function setVehPaintType(index, type, self) {
    const tableIndex = (type == 1 ? "primary" : "secondary") + "PaintType";
    if (bennysVehModifications[tableIndex] != index) {
        if (!changedMods[tableIndex]) {
            changedMods[tableIndex] = bennysVehModifications[tableIndex];
            bennysTotalPrice += bennysModTypes[tableIndex]?.price || 1000;
        } else if (index == changedMods[tableIndex]) {
            bennysTotalPrice -= bennysModTypes[tableIndex]?.price || 1000;
            changedMods[tableIndex] = false;
        }
    }
    bennysVehModifications[tableIndex] = index;
    sendData("bennysSetPaintType", {paintType: index, type});
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
}

function changeTyreSmokeColour(value) {
    let rgb = hexToRgb(value);
    if (bennysVehModifications.tyreSmokeColour != rgb) {
        if (!changedMods.tyreSmokeColour) {
            changedMods.tyreSmokeColour =
                bennysVehModifications.tyreSmokeColour;
            bennysTotalPrice += bennysModTypes.tyreSmokeColour?.price || 1000;
        } else if (rgb == changedMods.tyreSmokeColour) {
            bennysTotalPrice -= bennysModTypes.tyreSmokeColour?.price || 1000;
            changedMods.tyreSmokeColour = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.tyreSmokeColour = rgb;
    sendData("bennysSetTyreSmokeColour", rgb);
}

function bennysToogleMod(state, self) {
    let mod = parseInt(self.getAttribute("mod"));
    if (bennysVehModifications[mod] != state) {
        if (changedMods[mod] == undefined) {
            changedMods[mod] = bennysVehModifications[mod];
            bennysTotalPrice += bennysModTypes[mod]?.price || 1000;
        } else if (state == changedMods[mod]) {
            bennysTotalPrice -= bennysModTypes[mod]?.price || 1000;
            changedMods[mod] = undefined;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications[mod] = state;
    sendData("bennysToogleMod", {state, mod});
}

function changeVehColor(value, type) {
    let rgb = hexToRgb(value);
    let tableIndex = (type == 1 ? "primary" : "secondary") + "Colour";
    if (bennysVehModifications[tableIndex] != rgb) {
        if (!changedMods[tableIndex]) {
            changedMods[tableIndex] = bennysVehModifications[tableIndex];
            bennysTotalPrice += bennysModTypes[tableIndex]?.price || 1000;
        } else if (rgb == changedMods[tableIndex]) {
            bennysTotalPrice -= bennysModTypes[tableIndex]?.price || 1000;
            changedMods[tableIndex] = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications[tableIndex] = rgb;
    sendData("bennysSetColor", {r: rgb.r, g: rgb.g, b: rgb.b, type});
}

function changeNeonVehColor(value) {
    sendData("bennysSetNeonColor", hexToRgb(value));
}

function bennysSetConfig(data) {
    bennysConfig = data.config;
    bennysModTypes = data.modTypes;
    bennysAvailableModifications = data.availableModifications;
    bennysVehModifications = data.vehModifications;
    setHomeMenu();
}

function handlePearlescentColour(self) {
    let colourIndex = parseInt(self.getAttribute("colour-index"));
    if (bennysVehModifications.pearlescentColour != colourIndex) {
        if (!changedMods.pearlescentColour) {
            changedMods.pearlescentColour =
                bennysVehModifications.pearlescentColour;
            bennysTotalPrice += bennysModTypes.pearlescentColour?.price || 1000;
        } else if (colourIndex == changedMods.pearlescentColour) {
            bennysTotalPrice -= bennysModTypes.pearlescentColour?.price || 1000;
            changedMods.pearlescentColour = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.pearlescentColour = colourIndex;
    sendData("bennysSetPearlescentColour", {colourIndex});
}

function handleVehicleModChange(self) {
    let modType = parseInt(self.getAttribute("mod-index"));
    let modIndex = parseInt(self.getAttribute("mod"));
    if (bennysVehModifications[modType] != modIndex) {
        if (!changedMods[modType]) {
            changedMods[modType] = bennysVehModifications[modType];
            bennysTotalPrice += bennysModTypes[modType]?.price || 1000;
        } else if (modIndex == changedMods[modType]) {
            bennysTotalPrice -= bennysModTypes[modType]?.price || 1000;
            changedMods[modType] = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications[modType] = modIndex;
    sendData("bennysSetVehMod", {modType, modIndex});
}

function handleWheelIndexChange(self, rearWheel) {
    let wheelType = parseInt(self.getAttribute("wheel-type"));
    let wheelIndex = parseInt(self.getAttribute("wheel-index"));
    if (
        wheelType != bennysVehModifications.wheelType ||
        bennysVehModifications[rearWheel ? 24 : 23] != wheelIndex
    ) {
        if (!changedMods[rearWheel ? 24 : 23]) {
            changedMods[rearWheel ? 24 : 23] = bennysVehModifications[rearWheel ? 24 : 23];
            bennysTotalPrice += bennysModTypes[rearWheel ? 24 : 23]?.price || 1000;
        } else if (changedMods[rearWheel ? 24 : 23] == wheelIndex) {
            changedMods[rearWheel ? 24 : 23] = false;
            bennysTotalPrice -= bennysModTypes[rearWheel ? 24 : 23]?.price || 1000;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.wheelType = wheelType;
    bennysVehModifications[rearWheel ? 24 : 23] = wheelIndex;
    sendData("bennysSetWheel", {wheelType, wheelIndex, rearWheel});
}

function handleWheelColour(self) {
    let colourIndex = parseInt(self.getAttribute("colour-index"));
    if (bennysVehModifications.wheelColour != colourIndex) {
        if (!changedMods.wheelColour) {
            changedMods.wheelColour = bennysVehModifications.wheelColour;
            bennysTotalPrice += bennysModTypes.wheelColour?.price || 1000;
        } else if (colourIndex == changedMods.wheelColour) {
            bennysTotalPrice -= bennysModTypes.wheelColour?.price || 1000;
            changedMods.wheelColour = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.wheelColour = colourIndex;
    sendData("bennysSetWheelColour", {colourIndex});
}

function handleWheelChange(self) {
    let shopContent = $("#bennys-shop-content");
    let wheelType = parseInt(self.getAttribute("wheel-type"));
    let rearWheel = self.getAttribute('rear-wheel')
    let shopContentHtml = "";

    if (!bennysIsBike) {
        for (
            let i = -1;
            i <= bennysAvailableModifications[23][1][wheelType].numMods - 1;
            i++
        ) {
            let imgUrl = i == -1 ? `${imgBennysVehicleMods}/${bennysVName}/wheel_default` : `${imgBennysVehicleMods}/wheels/type_${wheelType}/${i}`
            let dfUrl = `${imgBennysVehicleMods}/default/23`
            shopContentHtml += `
                <div class="box ${
                bennysVehModifications.wheelType == wheelType &&
                bennysVehModifications[23] == i &&
                "box"
            }" onclick="handleWheelIndexChange(this)" wheel-type="${wheelType}" wheel-index="${i}" style="background-image: url('${imgUrl}.png'), url('${dfUrl}.png');">
                    <div>
                        <span>${
                i == -1
                    ? "Original"
                    : bennysAvailableModifications[23][1][wheelType][i]
            }</span>
                        <b>R$ ${"500,00"}</b>
                    </div>
                </div>
            `;
        }
    } else {
        for (
            let i = -1;
            i <= bennysAvailableModifications[23][1][wheelType].numMods - 1;
            i++
        ) {
            let imgUrl = i == -1 ? `${imgBennysVehicleMods}/${bennysVName}/wheel_default` : `${imgBennysVehicleMods}/wheels/type_6/${i}`
            let dfUrl = `${imgBennysVehicleMods}/default/23`
            shopContentHtml += `
                <div class="box ${
                bennysVehModifications[rearWheel ? 24 : 23] == i ?
                    "box" : ''
            }" onclick="handleWheelIndexChange(this,${rearWheel == "true"})" wheel-type="${6}" wheel-index="${i}" style="background-image: url('${imgUrl}.png'), url('${dfUrl}.png');">
                    <div>
                        <span>${
                i == -1
                    ? "Original"
                    : bennysAvailableModifications[23][1][wheelType][i]
            }</span>
                        <b>R$ ${"500,00"}</b>
                    </div>
                </div>
            `;
        }
    }


    shopContentHtml = '<div class="box">' + shopContentHtml + "</div>";

    shopContent.html(shopContentHtml);
    $("#bennys-title").html(bennysWheelTypes[wheelType]);
}

function bennysSetWindowTint(index, self) {
    if (bennysVehModifications.windowTint != index) {
        if (!changedMods.windowTint) {
            changedMods.windowTint = bennysVehModifications.windowTint;
            bennysTotalPrice += bennysModTypes.windowTint?.price || 1000;
        } else if (index == changedMods.windowTint) {
            bennysTotalPrice -= bennysModTypes.windowTint?.price || 1000;
            changedMods.windowTint = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.windowTint = index;
    sendData("bennysSetWindowTint", {value: index});
}

function bennysToggleNeon(self, index) {
    if (!changedMods.neon) changedMods.neon = {};
    let state = !bennysVehModifications.neon[index];
    if (bennysVehModifications.neon[index] != state) {
        if (changedMods.neon[index] == undefined) {
            changedMods.neon[index] = bennysVehModifications.neon[index];
            bennysTotalPrice += bennysModTypes.neon?.price || 1000;
        } else if (state == changedMods.neon[index]) {
            bennysTotalPrice -= bennysModTypes.neon?.price || 1000;
            changedMods.neon[index] = undefined;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.neon[index] = !bennysVehModifications.neon[index];
    self.classList[bennysVehModifications.neon[index] ? "add" : "remove"](
        "box"
    );
    sendData("bennysToggleNeon", {
        index,
        state: bennysVehModifications.neon[index],
    });
}

function bennysChangeNeonColor(value) {
    let rgb = hexToRgb(value);
    if (!changedMods.neon) changedMods.neon = {};
    if (bennysVehModifications.neon.color != rgb) {
        if (!changedMods.neon.color) {
            changedMods.neon.color = bennysVehModifications.neon.color;
            bennysTotalPrice += bennysModTypes.neonColor?.price || 1000;
        } else if (rgb == changedMods.neon.color) {
            bennysTotalPrice -= bennysModTypes.neonColor?.price || 1000;
            changedMods.neon.color = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.neon.color = rgb;
    sendData("bennysChangeNeonColor", rgb);
}

function bennysChangeXenonColor(self, index) {
    if (bennysVehModifications.xenonColour != index) {
        if (!changedMods.xenonColour) {
            changedMods.xenonColour = bennysVehModifications.xenonColour;
            bennysTotalPrice += bennysModTypes.xenonColour?.price || 1000;
        } else if (index == changedMods.xenonColour) {
            bennysTotalPrice -= bennysModTypes.xenonColour?.price || 1000;
            changedMods.xenonColour = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.xenonColour = index;
    sendData("bennysSetXenonColor", {value: index});
}

function bennysSetPlate(index, self) {
    if (bennysVehModifications.plate != index) {
        if (!changedMods.plate) {
            changedMods.plate = bennysVehModifications.plate;
            bennysTotalPrice += bennysModTypes.plate?.price || 1000;
        } else if (index == changedMods.plate) {
            bennysTotalPrice -= bennysModTypes.plate?.price || 1000;
            changedMods.plate = false;
        }
    }
    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);
    bennysVehModifications.plate = index;
    sendData("bennysSetPlateIndex", {plate: index});
}

function handleHomeMenuItemClick(self) {
    let shopContent = $("#boxes");
    let modIndex = self.getAttribute("mod-index");
    let shopContentHtml = "";

    if (modIndex == "turbo") {
        shopContent.html(`
            <div class="boxes">
                <div class="box" ${
            bennysVehModifications[18] && 'class="box"'
        } onclick="bennysToogleMod(true,this)" mod="18">Ativar
                <img src="../assets/bennys/brake.svg" alt="" class="slider__image">
                        <div class="price">
                            <p>2000</p>
                            <img src="../assets/monetization_on_24px.svg" alt="" class="icon">
                        </div>
                    </div>
                <div class="box" ${
            !bennysVehModifications[18] && 'class="box"'
        } onclick="bennysToogleMod(false,this)" mod="18">Desativar
                <img src="../assets/bennys/brake.svg" alt="" class="slider__image">
                    <div class="price">
                        <p>2000</p>
                        <img src="../assets/monetization_on_24px.svg" alt="" class="icon">
                    </div>
                </div>
            </div>
        `);
    } else if (modIndex == 'plate') {

        const plates = [
            'Azul / Branco 1',
            'Amarelo / Preto',
            'Amarelo / Azul',
            'Azul / Branco 2',
            'Azul / Branco 3',
            'Yankton'
        ]

        plates.map((v, k) => shopContentHtml += `
            <div class="box" ${
            bennysVehModifications.plate == k
                ? 'class="box"'
                : ""
        } onclick="bennysSetPlate(${k},this)" >${v}</div>
        `)

        shopContent.html(`
            <div class="boxes">
                ${shopContentHtml}
            </div>
        `);

        $("#bennys-title").html("Cor da Placa");
    } else if (modIndex == "xenon") {
        let defaultImgUrl = `${imgBennysVehicleMods}/default/xenon.png`
        let xenonColours = [
            "Branco",
            "Azul",
            "Azul Elétrico",
            "Verde Menta",
            "Verde Limão",
            "Amarelo",
            "Dourado",
            "Laranja",
            "Vermelho",
            "Rosa",
            "Rosa Choque",
            "Roxo",
            "Luz Negra",
        ];
        xenonColours[-1] = "Original";

        xenonColours.map(
            (v, k) =>
                (shopContentHtml += `
        <div class="box ${
                    bennysVehModifications.xenonColor == k ? "box" : ""
                }" onclick="bennysChangeXenonColor(this, ${k})" style="background-image: url('${defaultImgUrl}');">
            <div>
                <span>${v}</span>
                <b>R$ ${bennysModTypes[22].price}</b>
            </div>
        </div>
        `)
        );

        shopContentHtml = `
            <div class="box">
                <div ${
            bennysVehModifications[22] ? 'class="box"' : ""
        } onclick="bennysToogleMod(true,this)" mod="22" >Ativar</div>
                <div ${
            !bennysVehModifications[22] ? 'class="box"' : ""
        } onclick="bennysToogleMod(false,this)" mod="22" >Desativar</div>
            </div>
            <br>
            <div class="boxes">${shopContentHtml}</div>
        `;

        shopContent.html(shopContentHtml);
        $("#bennys-title").html("Xenon");
    } else if (modIndex == "neon") {
        const neonPositions = ["Esquerda", "Direita", "Frente", "Atrás"];

        neonPositions.map(
            (v, k) =>
                (shopContentHtml += `
            <div ${
                    bennysVehModifications.neon[k] ? 'class="box"' : ""
                } onclick="bennysToggleNeon(this, ${k})" >${v}</div>
        `)
        );

        shopContent.html(`
            <div class="boxes">
                ${shopContentHtml}
            </div>
            <div>
                <input oninput="bennysChangeNeonColor(this.value)" type="color" value="${rgbToHex(
            bennysVehModifications.neon.color.r,
            bennysVehModifications.neon.color.g,
            bennysVehModifications.neon.color.b
        )}">
            </div>
        `);
        $("#bennys-title").html("Neon");
    } else if (modIndex == "windowTintColour") {
        const windowColors = [
            "Normal",
            "Preto",
            "Cinza Escuro",
            "Cinza Claro",
            "Original",
            "Limousine",
            "Verde",
        ];

        windowColors.map(
            (v, k) =>
                (shopContentHtml += `
            <button ${
                    bennysVehModifications.windowTint == k
                        ? 'class="box"'
                        : ""
                } onclick="bennysSetWindowTint(${k},this)" >${v}</button>
        `)
        );

        shopContent.html(`
            <div class="boxes">
                ${shopContentHtml}
            </div>
        `);
        $("#bennys-title").html("Cor do vidro");
    } else if (modIndex == "tyreSmoke") {
        shopContent.html(`
        <div class="box" ${
            bennysVehModifications[20] && 'class="box"'
        } onclick="bennysToogleMod(true,this)" mod="20">
            Ativar
            <img src="../assets/bennys/tire.svg" alt="" class="slider__image">
            <div class="price">
                <p>1000</p>
                <img src="../assets/monetization_on_24px.svg" alt="" class="icon">
            </div>
        </div>
        <div class="box" ${
            bennysVehModifications[20] && 'class="box"'
        } onclick="bennysToogleMod(false,this)" mod="20">
            Desativar
            <img src="../assets/bennys/tire.svg" alt="" class="slider__image">
            <div class="price">
                <p>1000</p>
                <img src="../assets/monetization_on_24px.svg" alt="" class="icon">
            </div>
        </div>
        <input oninput="changeTyreSmokeColour(this.value)" type="color" value="${rgbToHex(
            bennysVehModifications.tyreSmokeColour.r,
            bennysVehModifications.tyreSmokeColour.g,
            bennysVehModifications.tyreSmokeColour.b
        )}">
        `);
        $("#bennys-title").html("Cor da Fumaça do Pneu");
    } else if (modIndex == "pearlescentColour") {
        let defaultImgUrl = `${imgBennysVehicleMods}/default/pearlescentColour.png`
        bennysWheelColours.map((v) => {
            shopContentHtml += `
                <div class="box ${
                bennysVehModifications.pearlescentColour == v.colorindex &&
                "box"
            }" onclick="handlePearlescentColour(this)" colour-index="${
                v.colorindex
            }" style="background-image: url('${defaultImgUrl}');">
					<div>
						<span>${v.name}</span>
						<b>R$ ${"500,00"}</b>
					</div>
				</div>
			`;
        });

        shopContentHtml =
            '<div class="boxes">' + shopContentHtml + "</div>";

        shopContent.html(shopContentHtml);
        $("#bennys-title").html("Cor do Perolado");
    } else if (modIndex == "primaryColour") {
        let paintTypes = "";

        bennysPaintTypes.map((v, k) => {
            paintTypes += `<button ${
                (bennysVehModifications.primaryPaintType == k &&
                    'class="box"') ||
                ""
            } onclick="setVehPaintType(${k},1,this)">${v}</button>`;
        });

        shopContent.html(`
            <div class="box">
                ${paintTypes}
            </div>

            <div class="box">
                <input oninput="changeVehColor(this.value,1)" type="color" value="${rgbToHex(
            bennysVehModifications.primaryColour.r,
            bennysVehModifications.primaryColour.g,
            bennysVehModifications.primaryColour.b
        )}">
            </div>
        `);
        $("#bennys-title").html("Cor Primária");
    } else if (modIndex == "secondaryColour") {
        let paintTypes = "";

        bennysPaintTypes.map((v, k) => {
            paintTypes += `<div ${
                (bennysVehModifications.primaryPaintType == k &&
                    'class="box"') ||
                ""
            } onclick="setVehPaintType(${k},2,this)">${v}</div>`;
        });

        shopContent.html(`
            <div class="boxes">
                ${paintTypes}
            </div>

            <div>
                <input oninput="changeVehColor(this.value,2)" type="color" value="${rgbToHex(
            bennysVehModifications.secondaryColour.r,
            bennysVehModifications.secondaryColour.g,
            bennysVehModifications.secondaryColour.b
        )}">
            </div>
        `);
        $("#bennys-title").html("Cor Secundária");
    } else if (modIndex == "wheelColour") {
        let defaultImgUrl = `${imgBennysVehicleMods}/default/wheelColour.png`
        bennysWheelColours.map((v) => {
            shopContentHtml += `
                <div class="box ${
                bennysVehModifications.wheelColour == v.colorindex &&
                "box"
            }" onclick="handleWheelColour(this)" colour-index="${
                v.colorindex
            }" style="background-image: url('${defaultImgUrl}');">
					<div>
						<span>${v.name}</span>
						<b>R$ ${"500,00"}</b>
					</div>
				</div>
			`;
        });

        shopContentHtml =
            '<div class="boxes">' + shopContentHtml + "</div>";

        shopContent.html(shopContentHtml);
        $("#bennys-title").html("Cor das Rodas");
        updateHoverActive();
    } else if (modIndex == 23) {
        let text = "";
        if (bennysIsBike) {
            let bgImg = `${imgBennysVehicleMods}/wheels/type_6/0`;
            let dfUrl = `${imgBennysVehicleMods}/default/23`
            text = `
                <div class="item" wheel-type="6" onclick="handleWheelChange(this)" style="background-image: url('${bgImg}.png');">
                    <span>Roda Dianteira</span>
                </div>
                <div class="item" wheel-type="6" rear-wheel="true" onclick="handleWheelChange(this)" style="background-image: url('${bgImg}.png'), url('${dfUrl}.png');">
                    <span>Roda Traseira</span>
                </div>
            `
            shopContentHtml += `
                <div class="box">
                    <div>
                        ${text}
                    </div>
                </div>
            `;
        } else {
            for (let i = 0; i <= 12; i++) {
                if (i != 6) {
                    let bgImg = `${imgBennysVehicleMods}/wheels/type_${i}/0`;
                    let dfUrl = `${imgBennysVehicleMods}/default/23`
                    text += `
                    <div class="item" wheel-type="${i}" onclick="handleWheelChange(this)" style="background-image: url('${bgImg}.png'), url('${dfUrl}.png');">
                        <span>${bennysWheelTypes[i]}</span>
                    </div>
                `;
                }
            }
            shopContentHtml += `
                <div class="box">
                    <div>
                        ${text}
                    </div>
                </div>
            `;
        }

        shopContent.html(shopContentHtml);

        updateHoverActive();
    } else {
        for (let i = -1; i < bennysAvailableModifications[modIndex][0]; i++) {
            let imgUrl = `${imgBennysVehicleMods}/${bennysVName}/mod_${modIndex}/${i}`
            let defaultUrl = `${imgBennysVehicleMods}/default/${modIndex}`
            shopContentHtml += `
				<div class="box ${
                bennysVehModifications[modIndex] == i && "box"
            }" onclick="handleVehicleModChange(this)" mod="${i}" mod-index="${modIndex}" style="background-image: url('${imgUrl}.png'), url('${defaultUrl}.png');">
					<div>
						<span>${
                customNames[modIndex]
                    ? customNames[modIndex][i]
                    : i == -1
                        ? "Original"
                        : bennysAvailableModifications[modIndex][1][
                        i
                        ] || "Nível " + (i + 1)
            }</span>
						<b>R$ ${bennysModTypes[modIndex].price}</b>
					</div>
				</div>
			`;
        }

        shopContentHtml =
            '<div class="boxes">' + shopContentHtml + "</div>";

        shopContent.html(shopContentHtml);
        $("#bennys-title").html(bennysModTypes[modIndex].name);
    }
}

function setHomeMenu() {
    let shopContent = $("#boxes");
    // let aside = $('#bennys-aside')
    let categories = {};
    let shopContentHtml = "";
    // let asideHtml = ''

    for (let i = 0; i <= 49; i++) {
        if (
            bennysAvailableModifications[i] ||
            bennysAvailableModifications[i][0] > 0
        ) {
            let modConfig = bennysModTypes[i];
            if (!categories[modConfig.category])
                categories[modConfig.category] = [];
            categories[modConfig.category].push({
                name: modConfig.name,
                modIndex: i,
            });
        }
    }

    if (!categories.appearance) categories.appearance = [];
    categories.appearance.push({
        name: "Cor Primária",
        modIndex: "primaryColour",
    });
    categories.appearance.push({
        name: "Cor Secundária",
        modIndex: "secondaryColour",
    });
    categories.appearance.push({
        name: "Perolado",
        modIndex: "pearlescentColour",
    });
    categories.appearance.push({
        name: "Vidros",
        modIndex: "windowTintColour",
    });
    categories.appearance.push({
        name: "Neon",
        modIndex: "neon",
    });
    categories.appearance.push({
        name: "Xenon",
        modIndex: "xenon",
    });
    categories.appearance.push({
        name: "Cor da Placa",
        modIndex: "plate",
    });

    if (!categories.wheels) categories.wheels = [];

    categories.wheels.push({name: "Rodas", modIndex: 23});
    categories.wheels.push({name: "Cor da Roda", modIndex: "wheelColour"});
    categories.wheels.push({name: "Fumaça do Pneu", modIndex: "tyreSmoke"});

    if (!categories.performance) categories.performance = [];
    categories.performance.push({name: "Turbo", modIndex: "turbo"});

    for ([k, v] of Object.entries(categories)) {
        let text = ""
        v.map((v) => {
            let imgUrl = v.modIndex == 23 ? `${imgBennysVehicleMods}/wheels/type_0/0` : `${imgBennysVehicleMods}/${bennysVName}/mod_${v.modIndex}/-1`;
            let defaultImgUrl = `${imgBennysVehicleMods}/default/${v.modIndex}`
            text += `
				<div mod-index="${v.modIndex}" onclick="handleHomeMenuItemClick(this)" style="background-image: url('${imgUrl}.png'), url('${defaultImgUrl}.png');" >
					<span>${v.name}</span>
				</div>
			`;
        });
        shopContentHtml += `
			<div class="box" id="${k}">
				<div>
					<span>${bennysCategoriesNames[k]}</span>
				</div>
				<div>
					${text}
				</div>
			</div>
		`;
        // asideHtml += `
        //     <div class="category flex-centerBennys activeMBennys scrollButtonBennys" ><i class="icon-mascara icon-fs2x" ></i></div>
        // `
    }

    shopContent.html(shopContentHtml);
    $("#bennys-title").html("Tunagem de carros");
    // aside.html(asideHtml)

    updateHoverActive();
}

function updateHoverActive() {
    $(".item").mouseenter(function () {
        $(this).addClass("active");
    });

    $(".item").mouseleave(function () {
        $(this).removeClass("active");
    });
}

function initBennysNUI(config, vehModifications, availableModifications, modTypes, vname, isBike) {
    bennysModTypes = modTypes;
    bennysAvailableModifications = availableModifications;
    bennysVehModifications = vehModifications;
    bennysVName = vname;
    bennysIsBike = isBike;

    bennysTotalPrice = 0;
    changedMods = {};

    $("#precoTotalBennys").html(`R$ ${bennysTotalPrice},00`);

    $('#actionmenuBennys').fadeIn(1000)
    setHomeMenu();
}


function SaveBennys() {

    $.post("http:/rb_garagem/BennysTryPayment", JSON.stringify({
        price: bennysTotalPrice
    }), (data) => {
        if (data.success == true) {

            sendData('bennysSave', {});
            $('#actionmenuBennys').fadeOut(1);
        } else {
            $.post("http://rb_garagem/bennysClose")
            $('#actionmenuBennys').fadeOut(1);

        }

    })

}

document.onkeypress = ({key}) => key == "h" && sendData("bennysSetFocus", {})