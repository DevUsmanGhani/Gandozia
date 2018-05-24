var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {

        this.receivedEvent();

    },

    receivedEvent: function () {

        /*Rendering Content via Javascript*/

        /*World Screens*/
        page('/overview', function () {
            displayPage("#overviewScreen");
        });

        page('/shop', function () {
            displayPage("#shopScreen");
        });

        page('/gamble', function () {
            displayPage("#gambleScreen");
        });


        /*Shop Screens*/
        page('/combatShop', function () {
            displayPage("#combatShop");
        });

        page('/huntingShop', function () {
            displayPage("#huntingShop");
        });

        page('/woodcuttingShop', function () {
            displayPage("#woodcuttingShop");
        });

        page('/miningShop', function () {
            displayPage("#miningShop");
        });

        /*Hero Screens*/

        page('/stats', function () {
            displayPage("#statsScreen");
        })

        page('/inventory', function () {
            displayPage("#inventoryScreen");
        });

        page('/equipment', function () {
            displayPage("#equipmentScreen");
        });

        /*Main Training screens*/
        page('/combat', function () {
            displayPage("#combatScreen");
        });

        page('/arcania', function () {
            displayPage("#arcaniaScreen");
        });

        page('/hunt', function () {
            displayPage("#huntScreen");
        });

        page('/woodcut', function () {
            displayPage("#woodcutScreen");
        });


        page('/mine', function () {
            displayPage("#mineScreen");
        });

        /*The combat Training screens*/
        page('/fightgoblin', function () {
            displayPage("#fightgoblinScreen");
        });

        page('/fightBandit', function () {
            displayPage("#fightBanditScreen");
        });
        page('/fightOrc', function () {
            displayPage("#fightOrcScreen");
        });


        /* The Defence Training screens*/
        page('/alchemy', function () {
            displayPage("#alchemyScreen");
        });

        /*The Hunting Training screens*/
        page('/huntDeer', function () {
            displayPage("#huntDeerScreen");
        });

        /* The Woodcutting Training screens*/
        page('/chopDeadTrees', function () {
            displayPage("#chopDeadTreesScreen");
        });

        /*The Mining Training screens*/
        page('/mineSmallCrystals', function () {
            displayPage("#mineSmallCrystalsScreen");
        });


        page();

        page('/overview');

        /*Performing Logic via Javascript*/


        /*Will re-initialize any saved data that the device may contain. If there is none then the game will default to the initial values*/
        /*if(window.localStorage.getItem("gameData") == null){*/
        var gameData = {

            goldCount: 0,
            currentHealth: 100,
            maxHealth: 100,
            currentArcana: 10,
            maxArcana: 10,
            foodHeal: 10,
            autoHealAmount: 0,

            skills: {

                combat: {
                    name: "combat",
                    level: 1,
                    exp: 0,
                    expNeeded: 83,
                    minDamage: 5,
                    maxDamage: 15,
                    accuracyBonus: 50,
                    defenceBonus: 10,
                    getHitChance: function () {
                        return this.level + this.accuracyBonus;
                    },
                    getBlockChance: function () {
                        return this.level + this.defenceBonus;
                    },

                },
                arcania: {
                    name: "arcania",
                    level: 1,
                    exp: 0,
                    expNeeded: 83,
                    arcaniaBonus: 10,
                    minBlastDmg: 5,
                    maxBlastDmg: 10,

                },
                hunting: {
                    name: "hunting",
                    level: 1,
                    exp: 0,
                    expNeeded: 83,
                    resourceCount: 0,
                    maxResource: 5,
                    trainingMessage: "You fire your bow at some prey...",
                    successMessage: "You kill your target! \n+1 Food. +50 Hunting xp.",
                    container: "Small Food Basket",
                    huntingBonus: 5,
                    getSkillChance: function () {
                        return this.level / 3 + this.huntingBonus;
                    },

                },
                woodcutting: {
                    name: "woodcutting",
                    level: 1,
                    exp: 0,
                    expNeeded: 83,
                    resourceCount: 0,
                    maxResource: 5,
                    trainingMessage: "You swing your hatchet at the tree...",
                    successMessage: "You successfully chop some wood!\n+1 Log. +50 Woodcutting xp.",
                    container: "Small Log Box",
                    woodCuttingBonus: 5,
                    getSkillChance: function () {
                        return this.level / 3 + this.woodCuttingBonus;
                    }
                },
                mining: {
                    name: "mining",
                    level: 1,
                    exp: 0,
                    expNeeded: 83,
                    resourceCount: 0,
                    maxResource: 5,
                    trainingMessage: "You strike your pickaxe at the rock...",
                    successMessage: "You successfully gather an Arcanic Crystal! \n+1 Arcanic Crystal. +50 Mining xp.",
                    container: "Small Crystal Pouch",
                    miningBonus: 5,
                    getSkillChance: function () {
                        return this.level / 3 + this.miningBonus;
                    }
                },
            },

            buyables: {

                combat: {

                    /*Weapons*/
                    woodenStick: {
                        visible: true,
                        equipId: "#equippedWeapon",
                        buyId: "#buyWoodenStick",
                        costId: "#woodenStickCost",
                        name: "Wooden Stick",
                        cost: 20,
                        buyMessage: "You have purchased a Wooden Stick.\nYour attacks will now be more accurate.",
                        itemEffect: function () {
                            gameData.skills.combat.accuracyBonus += 10;
                            nextBuyable(gameData.buyables.combat.steelSword);

                        },
                    },

                    steelSword: {
                        visible: false,
                        equipId: "#equippedWeapon",
                        buyId: "#buySteelSword",
                        costId: "#steelSwordCost",
                        name: "Steel Sword",
                        cost: 100,
                        buyMessage: "You have purchased a Steel Sword.\nYour attacks will now do more damage",
                        itemEffect: function () {
                            gameData.skills.combat.accuracyBonus += 10;
                            gameData.skills.combat.minDamage += 10;
                            gameData.skills.combat.maxDamage += 10;
                        },
                    },
                    hellFireSpear: {
                        visible: false,
                        equipId: "#equippedWeapon",
                        buyId: "#buyHellFireSpear",
                        costId: "#hellFireSpearCost",
                        name: "Hell Fire Spear of Ares",
                        cost: 0,
                        buyMessage: "You have purchased The Hell Fire Spear of Ares!\nMay the gods have mercy on your enemies.",
                        itemEffect: function () {
                            gameData.skills.combat.accuracyBonus += 999;
                            gameData.skills.combat.minDamage += 999;
                            gameData.skills.combat.maxDamage += 999;
                        },
                    },

                    /*Armors*/
                    leatherArmor: {
                        visible: true,
                        equipId: "#equippedArmor",
                        buyId: "#buyLeatherArmor",
                        costId: "#leatherArmorCost",
                        name: "Leather Armor",
                        cost: 50,
                        buyMessage: "You have purchased Leather Armor.\nYou can now take more damage.",
                        itemEffect: function () {
                            gameData.skills.combat.defenceBonus += 5;
                            gameData.maxHealth += 10;
                            gameData.currentHealth += 10;
                            nextBuyable(gameData.buyables.combat.steelArmor);
                        },

                    },
                    steelArmor: {
                        visible: true,
                        equipId: "#equippedArmor",
                        buyId: "#buySteelArmor",
                        costId: "#steelArmorCost",
                        name: "Steel Armor",
                        cost: 200,
                        buyMessage: "You have purchased Steel Armor.\nYou can now take more damage.",
                        itemEffect: function () {
                            gameData.skills.combat.defenceBonus += 10;
                            gameData.maxHealth += 25;
                            gameData.currentHealth += 25;
                        },

                    },

                    /*Helms*/
                    vikingHelmet: {
                        visible: true,
                        equipId: "#equippedHelmet",
                        buyId: "#buyVikingHelmet",
                        costId: "#vikingHelmetCost",
                        name: "Viking Helmet",
                        cost: 250,
                        buyMessage: "You have purchased the Viking Helmet.\nOdin's power will help you be much \nmore accurate with your blows.",
                        itemEffect: function () {
                            gameData.skills.combat.accuracyBonus += 25;
                        },
                    },

                    /*Amulets*/
                    amuletofBlood: {
                        visible: true,
                        equipId: "#equippedAmulet",
                        buyId: "#buyAmuletOfBlood",
                        costId: "#amuletOfBloodCost",
                        name: "Amulet of Blood",
                        cost: 750,
                        buyMessage: "You have purchased the Amulet of Blood.\nIt will heal you with the blood of your foes!",
                        itemEffect: function () {
                            gameData.autoHealAmount++;
                        },
                    },
                },

                hunting: {

                    huntingBow: {
                        visible: true,
                        equipId: "#inventoryBow",
                        buyId: "#buyHuntingBow",
                        costId: "#huntingBowCost",
                        name: "Hunting Bow",
                        cost: 100,
                        buyMessage: "You have purchased the Hunting Bow\nYou will now be able to hunt with ease",
                        itemEffect: function () {
                            gameData.skills.hunting.huntingBonus += 5;
                            nextBuyable(gameData.buyables.hunting.scopedHuntingBow);
                        },
                    },

                    scopedHuntingBow: {
                        visible: false,
                        equipId: "#inventoryBow",
                        buyId: "#buyScopedHuntingBow",
                        costId: "#scopedHuntingBowCost",
                        name: "Scoped Hunting Bow",
                        cost: 250,
                        buyMessage: "You have purchased the Scoped Hunting Bow\nYou will now be able to hunt with ease",
                        itemEffect: function () {
                            gameData.skills.hunting.huntingBonus += 10;
                        },
                    },

                    smallFoodChest: {
                        visible: true,
                        equipId: "#inventoryFoodChest",
                        buyId: "#buySmallFoodChest",
                        costId: "#smallFoodChestCost",
                        name: "Small Food Chest",
                        cost: 30,
                        buyMessage: "You have purchased the Small Food Chest.\nYou can now store more food!",
                        itemEffect: function () {
                            gameData.skills.hunting.maxResource += 5;
                            nextBuyable(gameData.buyables.hunting.mediumFoodChest);
                        },
                    },
                    mediumFoodChest: {
                        visible: false,
                        equipId: "#inventoryFoodChest",
                        buyId: "#buyMediumFoodChest",
                        costId: "#mediumFoodChestCost",
                        name: "Medium Food Chest",
                        cost: 100,
                        buyMessage: "You have purchased the Medium Food Chest.\nYou can now store more food!",
                        itemEffect: function () {
                            gameData.skills.hunting.maxResource += 10;
                            nextBuyable(gameData.buyables.hunting.largeFoodChest);
                        },
                    },
                    largeFoodChest: {
                        visible: false,
                        equipId: "#inventoryFoodChest",
                        buyId: "#buyLargeFoodChest",
                        costId: "#largeFoodChestCost",
                        name: "Large Food Chest",
                        cost: 275,
                        buyMessage: "You have purchased the Large Food Chest.\nYou can now store more food!",
                        itemEffect: function () {
                            gameData.skills.hunting.maxResource += 30;
                            nextBuyable(gameData.buyables.hunting.extraLargeFoodChest);
                        },
                    },
                    extraLargeFoodChest: {
                        visible: false,
                        equipId: "#inventoryFoodChest",
                        buyId: "#buyExtraLargeFoodChest",
                        costId: "#extraLargeFoodChestCost",
                        name: "Extra Large Food Chest",
                        cost: 1000,
                        buyMessage: "You have purchased the Extra Large Food Chest.\nYou can now store more food!",
                        itemEffect: function () {
                            gameData.skills.hunting.maxResource += 50;
                        },
                    },
                    food: {
                        visible: true,
                        equipId: "",
                        buyId: "#buyFood",
                        costId: "#foodCost",
                        name: "Food",
                        cost: 10,
                        buyMessage: "",
                        itemEffect: function () {
                            $(this.buyId).css("display", "block");
                            this.visible = true;
                            if (gameData.skills.hunting.resourceCount < gameData.skills.hunting.maxResource) {
                                messageLong("You purchase some food.", "success");
                                gameData.skills.hunting.resourceCount += 1;
                            } else {
                                messageLong("You cannot store any more food.", "error");
                                gameData.goldCount += this.cost;
                            }
                        },
                    },

                },

                woodCutting: {
                    /*Hatchets*/
                    steelHatchet: {
                        visible: true,
                        equipId: "#inventoryHatchet",
                        buyId: "#buySteelHatchet",
                        costId: "#steelHatchetCost",
                        name: "Steel Hatchet",
                        cost: 100,
                        buyMessage: "You have purchased a Steel Hatchet.\nYou can now chop logs easier.",
                        itemEffect: function () {
                            gameData.skills.woodcutting.woodCuttingBonus += 5;
                            nextBuyable(gameData.buyables.woodCutting.doubleSidedHatchet);
                        },
                    },
                    doubleSidedHatchet: {
                        visible: true,
                        equipId: "#inventoryHatchet",
                        buyId: "#buyDoubleSidedHatchet",
                        costId: "#doubleSidedHatchetCost",
                        name: "Double Sided Hatchet",
                        cost: 295,
                        buyMessage: "You have purchased a Double Sided Hatchet.\nYou can now chop logs easier.",
                        itemEffect: function () {
                            gameData.skills.woodcutting.woodCuttingBonus += 10;
                        },
                    },
                    /*Log Bags*/
                    smallLogBag: {
                        visible: true,
                        equipId: "#inventoryLogBag",
                        buyId: "#buySmallLogBag",
                        costId: "#smallLogBagCost",
                        name: "Small Log Bag",
                        cost: 28,
                        buyMessage: "You have purchased the Small Log Bag\nYou can now store more logs.",
                        itemEffect: function () {
                            gameData.skills.woodcutting.maxResource += 5;
                            nextBuyable(gameData.buyables.woodCutting.mediumLogBag);
                        },
                    },

                    mediumLogBag: {
                        visible: false,
                        equipId: "#inventoryLogBag",
                        buyId: "#buyMediumLogBag",
                        costId: "#mediumLogBagCost",
                        name: "Medium Log Bag",
                        cost: 100,
                        buyMessage: "You have purchased the Medium Log Bag\nYou can now store more logs.",
                        itemEffect: function () {
                            gameData.skills.woodcutting.maxResource += 10;
                            nextBuyable(gameData.buyables.woodCutting.largeLogBag);
                        },
                    },

                    largeLogBag: {
                        visible: false,
                        equipId: "#inventoryLogBag",
                        buyId: "#buyLargeLogBag",
                        costId: "#largeLogBagCost",
                        name: "Large Log Bag Chest",
                        cost: 275,
                        buyMessage: "You have purchased the Large Log Bag.\nYou can now store more logs!",
                        itemEffect: function () {
                            gameData.skills.woodcutting.maxResource += 30;
                            nextBuyable(gameData.buyables.woodCutting.extraLargeLogBag);
                        },
                    },

                    extraLargeLogBag: {
                        visible: false,
                        equipId: "#inventoryLogBag",
                        buyId: "#buyExtraLargeLogBag",
                        costId: "#extraLargeLogBagCost",
                        name: "Extra Large Food Chest",
                        cost: 1000,
                        buyMessage: "You have purchased the Extra Large Log Bag.\nYou can now store more logs!",
                        itemEffect: function () {
                            gameData.skills.woodcutting.maxResource += 50;
                        },
                    },

                    logs: {
                        visible: true,
                        equipId: "",
                        buyId: "#buyLog",
                        costId: "#logCost",
                        name: "Log",
                        cost: 13,
                        buyMessage: "",
                        itemEffect: function () {
                            $(this.buyId).css("display", "block");
                            this.visible = true;
                            if (gameData.skills.woodcutting.resourceCount < gameData.skills.woodcutting.maxResource) {
                                messageLong("You purchase a log.", "success");
                                gameData.skills.woodcutting.resourceCount++;
                            } else {
                                gameData.goldCount += this.cost;
                                messageLong("You cannot store any more logs.", "error");
                            }
                        },
                    },


                },

                mining: {

                    /*Pickaxes*/
                    steelPickaxe: {
                        visible: true,
                        equipId: "#inventoryPickaxe",
                        buyId: "#buySteelPickaxe",
                        costId: "#steelPickaxeCost",
                        name: "Steel Pickaxe",
                        cost: 100,
                        buyMessage: "You have purchased a Steel Pickaxe.\nYou will collect crystals easier now.",
                        itemEffect: function () {
                            gameData.skills.mining.miningBonus += 5;
                            nextBuyable(gameData.buyables.mining.reinforcedPickaxe);
                        },
                    },
                    reinforcedPickaxe: {
                        visible: false,
                        equipId: "#inventoryPickaxe",
                        buyId: "#buyReinforcedPickaxe",
                        costId: "#reinforcedPickaxeCost",
                        name: "Reinforced Pickaxe",
                        cost: 280,
                        buyMessage: "You have purchased the Reinforced Pickaxe.\nYou will collect crystals easier now.",
                        itemEffect: function () {
                            gameData.skills.mining.miningBonus += 10;
                        },
                    },
                    /*Crystal Pouchess*/
                    smallCrystalPouch: {
                        visible: true,
                        equipId: "#inventoryCrystalPouch",
                        buyId: "#buySmallCrystalPouch",
                        costId: "#smallCrystalPouchCost",
                        name: "Small Crystal Pouch",
                        cost: 25,
                        buyMessage: "You have purchased the Small Crystal Pouch.\nYou can now store more crystals.",
                        itemEffect: function () {
                            gameData.skills.mining.maxResource += 5;
                            nextBuyable(gameData.buyables.mining.mediumCrystalPouch);
                        },
                    },
                    mediumCrystalPouch: {
                        visible: false,
                        equipId: "#inventoryCrystalPouch",
                        buyId: "#buyMediumCrystalPouch",
                        costId: "#mediumCrystalPouchCost",
                        name: "Medium Crystal Pouch",
                        cost: 100,
                        buyMessage: "You have purchased the Medium Crystal Pouch.\nYou can now store more crystals.",
                        itemEffect: function () {
                            gameData.skills.mining.maxResource += 10;
                            nextBuyable(gameData.buyables.mining.largeCrystalPouch);
                        },
                    },
                    largeCrystalPouch: {
                        visible: false,
                        equipId: "#inventoryCrystalPouch",
                        buyId: "#buyLargeCrystalPouch",
                        costId: "#largeCrystalPouchCost",
                        name: "Large Crystal Pouch",
                        cost: 275,
                        buyMessage: "You have purchased the Large Crystal Pouch.\nYou can now store more crystals.",
                        itemEffect: function () {
                            gameData.skills.mining.maxResource += 30;
                            nextBuyable(gameData.buyables.mining.extraLargeCrystalPouch);
                        },
                    },
                    extraLargeCrystalPouch: {
                        visible: false,
                        equipId: "#inventoryCrystalPouch",
                        buyId: "#buyExtraLargeCrystalPouch",
                        costId: "#extraLargeCrystalPouchCost",
                        name: "Extra Large Crystal Pouch",
                        cost: 1000,
                        buyMessage: "You have purchased the Extra Large Crystal Pouch.\nYou can now store more crystals.",
                        itemEffect: function () {
                            gameData.skills.mining.maxResource += 50;
                        },
                    },
                    arcanicCrystal: {
                        visible: true,
                        equipId: "",
                        buyId: "#buyArcanicCrystal",
                        costId: "#arcanicCrystalCost",
                        name: "Arcanic Crystal",
                        cost: 15,
                        buyMessage: "",
                        itemEffect: function () {
                            $(this.buyId).css("display", "block");
                            this.visible = true;
                            if (gameData.skills.mining.resourceCount < gameData.skills.mining.maxResource) {
                                messageLong("You buy an Arcanic Crystal.", "success");
                                gameData.skills.mining.resourceCount++;
                            } else {
                                messageLong("You cannot store any more crystals.", "error");
                                gameData.goldCount += this.cost;
                            }
                        },
                    },

                },
            },

            enemies: {
                goblin: {
                    name: "goblin",
                    healthId: "#goblinHp",
                    healthBarId: "#goblinHealthBar",
                    fightId: "#fightGoblinButton",
                    blastId: "#blastGoblin",
                    infoId: "#goblinInfo",
                    currentHealth: 50,
                    maxHealth: 50,
                    minDamage: 7,
                    maxDamage: 13,
                    minGoldDrop: 7,
                    maxGoldDrop: 35,
                    blockChance: 0,
                    hitChance: 40,
                    xp: 100,
                    getHealthBar: function () {
                        var healthString = this.currentHealth + "/" + this.maxHealth
                        return (healthString);
                    },
                },

                bandit: {
                    name: "bandit",
                    healthId: "#banditHp",
                    healthBarId: "#banditHealthBar",
                    fightId: "#fightBanditButton",
                    blastId: "#blastBandit",
                    infoId: "#banditInfo",
                    currentHealth: 75,
                    maxHealth: 75,
                    minDamage: 30,
                    maxDamage: 60,
                    minGoldDrop: 38,
                    maxGoldDrop: 80,
                    blockChance: 10,
                    hitChance: 70,
                    xp: 250,
                    getHealthBar: function () {
                        var healthString = this.currentHealth + "/" + this.maxHealth
                        return (healthString);
                    },
                },

                orc: {
                    name: "orc",
                    healthId: "#orcHp",
                    healthBarId: "#orcHealthBar",
                    fightId: "#fightOrcButton",
                    blastId: "#blastOrc",
                    infoId: "#orcInfo",
                    currentHealth: 150,
                    maxHealth: 150,
                    minDamage: 40,
                    maxDamage: 60,
                    minGoldDrop: 60,
                    maxGoldDrop: 120,
                    blockChance: 30,
                    hitChance: 70,
                    xp: 400,
                    getHealthBar: function () {
                        var healthString = this.currentHealth + "/" + this.maxHealth
                        return (healthString);
                    },
                },
            },


        };
        /* }
         else{
             var gameData = JSON.parse(localStorage.getItem("gameData"));
         }
         */

        /*Autosaves the game every  3 seconds*/
        var autoSave = setInterval(function () {
            window.localStorage.setItem("gameData", JSON.stringify(gameData));
        }, 3000);


        /*Function that will update the user display to curent values (updates every 100ms)*/
        var updateGameData = setInterval(function () {
            /*Top Navbar of UI*/
            /*Healthbar*/
            displayHealthBarAndArcanaBar()

            checkIfDead();

            /*Resources*/
            $("#goldCount").html(gameData.goldCount);
            displayResources("#foodCount", gameData.skills.hunting);
            displayResources("#logCount", gameData.skills.woodcutting);
            displayResources("#arcanicCrystalCount", gameData.skills.mining);
            showAlchemyLogs();

            /*Inventory*/
            displayResources("#inventoryFood", gameData.skills.hunting);
            displayResources("#inventoryLogs", gameData.skills.woodcutting);
            displayResources("#inventoryArcanicCrystals", gameData.skills.mining);

            /*Equipment*/
            renderEquipmentAndInventoryStats();

            /*Displays Levels and Experience in Skills tab*/
            displayLevelsandExp();

            /*Checks to see if player has leveled up any skills*/
            checkLevels();


            /*Changes the color of the prices of buyable items depending on if you can afford them*/
            checkPriceColors();

            priceColor("#gamble100", 100);
            priceColor("#gamble1000", 1000);
            priceColor("#gamble2500", 2500);
            priceColor("#gamble5000", 5000);

            /*Displays Health of Enemies in combat*/
            showEnemiesHealth();

        }, 100);


        /*Functions*/
        navBarLinkActive();
        eatFood();
        absorbCrystal();
        showEnemyInfo();
        showArcaniaInfo();
        alchemy();
        nameAndPriceBuyables();

        /*All the onclick Training Functions*/
        /*The onclick function that will fight in combat*/
        fightEnemy(gameData.enemies.goblin);
        fightEnemy(gameData.enemies.bandit);
        fightEnemy(gameData.enemies.orc);

        blastEnemy(gameData.enemies.goblin);
        blastEnemy(gameData.enemies.bandit);
        blastEnemy(gameData.enemies.orc);

        /*The onclick function that will hunt for food*/
        $("#huntDeerScreen").click(function () {
            trainSkill(gameData.skills.hunting);
        });
        /*The onclick function that will chop for logs*/
        $("#chopDeadTreesScreen").click(function () {
            trainSkill(gameData.skills.woodcutting);
        });
        /*The onclick function that will mine for crystals*/
        $("#mineSmallCrystalsScreen").click(function () {
            trainSkill(gameData.skills.mining);
        });

        //onblick buying functions
        buy();
        hellFireCheat();

        /*The selling screens*/
        $("#sellFood").click(function () {
            if (gameData.skills.hunting.resourceCount > 0) {
                gameData.skills.hunting.resourceCount--;
                var sellFor = Math.floor(gameData.buyables.hunting.food.cost * .6);
                gameData.goldCount += sellFor;
                message("You sell some food and recieve " + sellFor + " gold!", "success");
            } else {
                message("You do not have any food!", "error");
            }
        });

        $("#sellLog").click(function () {
            if (gameData.skills.woodcutting.resourceCount > 0) {
                gameData.skills.woodcutting.resourceCount--;
                var sellFor = Math.floor(gameData.buyables.woodCutting.logs.cost * .6);
                gameData.goldCount += sellFor;
                message("You sell a log and recieve " + sellFor + " gold!", "success");
            } else {
                message("You do not have any logs!", "error");
            }
        });


        $("#sellCrystal").click(function () {
            if (gameData.skills.mining.resourceCount > 0) {
                gameData.skills.mining.resourceCount--;
                var sellFor = Math.floor(gamedata.buyables.woodCutting.logs.cost * .6);
                gameData.goldCount += sellFor;
                message("You sell an Arcanic Crystal and recieve " + sellFor + " gold!", "success");
            } else {
                message("You do not have any crystals!", "error");
            }
        });

        /*The gambling buttons*/
        $("#gamble100").click(function () {
            gamble(100);
        });
        $("#gamble1000").click(function () {
            gamble(1000);
        });
        $("#gamble2500").click(function () {
            gamble(2500);
        });
        $("#gamble5000").click(function () {
            gamble(5000);
        });

        var autoHeal = setInterval(function () {
            if (gameData.currentHealth < gameData.maxHealth) {
                gameData.currentHealth += gameData.autoHealAmount;
            }
        }, 2000);



        /*All functions*/
        function priceColor(idToChange, cost) {
            if (gameData.goldCount >= cost) {
                $(idToChange).css("color", "forestgreen");
            } else {
                $(idToChange).css("color", "red");
            }

        }


        function message(text, type) {
            //types: error, success, info, warn
            $("#topBar").notify(text, {
                autoHideDelay: 1500,
                position: "bottom center",
                showDuration: 250,
                className: type,
                hideDuration: 250,
                arrowShow: false,
            });
        }

        function messageLong(text, type) {
            //types: error, success, info, warn
            $("#topBar").notify(text, {
                autoHideDelay: 4000,
                position: "bottom center",
                showDuration: 500,
                className: type,
                hideDuration: 500,
                arrowShow: false,
            });
        }



        function displayPage(pageToDisplay) {
            $(pageToDisplay).css("display", "block");
            $(pageToDisplay).siblings().css("display", "none");
        }

        function gamble(amount) {
            if (gameData.goldCount >= amount) {
                gameData.goldCount = gameData.goldCount - amount;
                var myRoll = Math.floor(Math.random() * 100) + 1;
                if (myRoll > 50) {
                    gameData.goldCount = gameData.goldCount + 2 * amount;
                    popUp("You Win!", "Roll is " + roll + ". You win!");
                } else {
                    popUp("You Lose!", "Roll is " + roll + ". You lose.");
                }
            }
        }

        function trainSkill(skill) {
            var roll = Math.floor(Math.random() * 100) + 1;
            var threshold = skill.getSkillChance();
            if (skill.resourceCount < skill.maxResource) {
                if (roll <= threshold) {
                    skill.resourceCount++;
                    skill.exp += 50;
                    if (skill.exp < skill.expNeeded) {
                        message(skill.successMessage, "success");
                    }
                } else {
                    $("#gandozia").notify(skill.trainingMessage, {
                        autoHideDelay: 200,
                        position: "top center",
                        showDuration: 0,
                        className: "info",
                        hideDuration: 0,
                        arrowShow: false,

                    });
                }
            } else {
                message("Your " + skill.container + " is full! \nYou cannot gather any more of this resource.", "error");
            }
        }

        function displayResources(id, skill) {
            $(id).html(skill.resourceCount + "/" + skill.maxResource);

        }

        function displayLevel(id, skill) {
            $(id).html(skill.name + ": " + skill.level + "/99");
        }

        function displayExp(id, skill) {
            $(id).html("Exp: " + skill.exp + " | Exp to Level: " + skill.expNeeded);
        }

        function displayLevelsandExp() {
            var skill;
            for (skill in gameData.skills) {
                var lowerCaseName = gameData.skills[skill].name;
                var lvlTag = ("#" + lowerCaseName + "Level");
                var expTag = ("#" + lowerCaseName + "Exp");
                displayLevel(lvlTag, gameData.skills[skill]);
                displayExp(expTag, gameData.skills[skill]);
            }
        }

        function checkLevels() {
            var skill;
            for (skill in gameData.skills) {
                if (gameData.skills[skill].exp >= gameData.skills[skill].expNeeded) {
                    gameData.skills[skill].level++;
                    gameData.skills[skill].expNeeded += Math.floor(Math.floor(gameData.skills[skill].level + (300 * (Math.pow(2, (gameData.skills[skill].level/7)))))/4);
                    $.alert({
                        title: "Congratulations!",
                        content: "You have acheived " + gameData.skills[skill].name + " level: " + gameData.skills[skill].level,
                        type: "dark",
                        buttons: {
                            levelUp: {
                                text: "Level Up!",
                                btnClass: "btn-dark",
                            }
                        },

                    });
                    if (gameData.skills[skill].name == "arcania") {
                        gameData.maxArcana++;
                    }
                }
            }
        }

        function checkPriceColors() {
            var buyableType;
            for (buyableType in gameData.buyables) {
                var type = gameData.buyables[buyableType];
                for (var buyable in type) {
                    priceColor(type[buyable].costId, type[buyable].cost);
                }
            }
        }


        function displayHealthBarAndArcanaBar() {
            $(".showHp").html(gameData.currentHealth + "/" + gameData.maxHealth);
            $(".showArcana").html(gameData.currentArcana + "/" + gameData.maxArcana);
            if (gameData.currentHealth >= gameData.maxHealth * .5) {
                $(".showHp").css("color", "darkgreen");
                $(".healthBar").removeClass("progress-bar-danger").addClass("progress-bar-success");
            } else {
                $(".showHp").css("color", "red");
                $(".healthBar").removeClass("progress-bar-success").addClass("progress-bar-danger");
            }
            var healthPercent = (gameData.currentHealth / gameData.maxHealth) * 100;
            $(".healthBar").css("width", healthPercent + "%");
            var arcanaPercent = (gameData.currentArcana / gameData.maxArcana) * 100;
            $(".arcanaBar").css("width", arcanaPercent + "%");
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function buy() {
            var buyableCategory;
            for (buyableCategory in gameData.buyables) {
                try {
                    throw buyableCategory
                } catch (category) {
                    for (var buyable in gameData.buyables[category]) {
                        try {
                            throw buyable
                        } catch (item) {
                            $(gameData.buyables[category][item].buyId).click(function () {
                                if (gameData.goldCount >= gameData.buyables[category][item].cost) {
                                    $(this).css("display", "none");
                                    gameData.buyables[category][item].visible = false;
                                    gameData.goldCount -= gameData.buyables[category][item].cost;
                                    messageLong(gameData.buyables[category][item].buyMessage, "success");
                                    $(gameData.buyables[category][item].equipId).html(gameData.buyables[category][item].name);
                                    gameData.buyables[category][item].itemEffect();
                                } else {
                                    messageLong("You do not have enough gold to purchase this!", "error");
                                }

                            });
                        }
                    }
                }
            }
        }


        function eatFood() {
            $(".eatFood").click(function () {
                if (gameData.skills.hunting.resourceCount >= 1) {
                    if (gameData.currentHealth < gameData.maxHealth) {
                        gameData.skills.hunting.resourceCount--;
                        gameData.currentHealth += gameData.foodHeal;
                        var eatString = "You eat some food and gain " + gameData.foodHeal + " health!";
                        message(eatString, "success");
                        if (gameData.currentHealth > gameData.maxHealth) {
                            gameData.currentHealth = gameData.maxHealth;
                        }
                    } else {
                        message("You are already at full health.", "info");
                    }

                } else {
                    message("You don't have any food!", "error");
                }
            })
        }

        function showEnemiesHealth() {
            for (var enemy in gameData.enemies) {
                try {
                    throw enemy
                } catch (e) {
                    $(gameData.enemies[e].healthId).html(gameData.enemies[e].getHealthBar());
                    var healthPercent = (gameData.enemies[e].currentHealth / gameData.enemies[e].maxHealth) * 100;
                    $(gameData.enemies[e].healthBarId).css("width", healthPercent + "%");
                    if (gameData.enemies[e].currentHealth >= (gameData.enemies[e].maxHealth / 2)) {
                        $(gameData.enemies[e].healthId).css("color", "darkgreen");
                        $(gameData.enemies[e].healthBarId).removeClass("progress-bar-danger").addClass("progress-bar-success");
                    } else {
                        $(gameData.enemies[e].healthId).css("color", "red");
                        $(gameData.enemies[e].healthBarId).removeClass("progress-bar-success").addClass("progress-bar-danger");
                    }
                }
            }
        }

        function fightEnemy(enemy) {
            $(enemy.fightId).click(function () {
                $(this).css("visibility", "hidden");
                $(enemy.blastId).css("visibility", "hidden");
                //Hero attacking enemy
                var roll = Math.floor(Math.random() * 100) + 1;
                var hitChance = gameData.skills.combat.getHitChance() - enemy.blockChance;
                if (hitChance >= roll) {
                    var dmg = getRandomInt(gameData.skills.combat.minDamage, gameData.skills.combat.maxDamage);
                    enemy.currentHealth -= dmg;
                    //if hit and kill
                    if (enemy.currentHealth <= 0) {
                        var goldDrop = getRandomInt(enemy.minGoldDrop, enemy.maxGoldDrop);
                        popUp("Loot!", "You find " + goldDrop + " gold on the\ndead " + enemy.name + "'s body!");
                        gameData.goldCount += goldDrop;
                        popUp("Kill!", "You strike the " + enemy.name + " for " + dmg + " damage and kill it! You gain " + enemy.xp + " xp!");
                        gameData.skills.combat.exp += enemy.xp;
                    }
                    //if hit no kill
                    else {
                        message("You strike the " + enemy.name + " for " + dmg + " damage!", "success");
                    }

                }
                //if no hit
                else {
                    message("The " + enemy.name + " blocks your attack.", "warn");
                }

                //Enemy attacking hero
                if (enemy.currentHealth > 0) {
                    setTimeout(function () {
                        var enemyRoll = Math.floor(Math.random() * 100) + 1;
                        var enemyHitChance = enemy.hitChance - gameData.skills.combat.getBlockChance();
                        if (enemyHitChance >= enemyRoll) {
                            var enemyDmg = getRandomInt(enemy.minDamage, enemy.maxDamage);
                            message("The " + enemy.name + " strikes you for " + enemyDmg + " damage!", "error");
                            gameData.currentHealth -= enemyDmg;
                        } else {
                            message("You block the " + enemy.name + "'s attack.", "warn");
                        }
                    }, 2000);
                } else {
                    enemy.currentHealth = enemy.maxHealth;
                }

                //Reshowing the button after the fight round ends
                setTimeout(function () {
                    $(enemy.blastId).css("visibility", "visible");
                    $(enemy.fightId).css("visibility", "visible");
                }, 4000);

            });
        }

        function blastEnemy(enemy) {
            $(enemy.blastId).click(function () {
                if (gameData.currentArcana >= 5) {
                    $(this).css("visibility", "hidden");
                    $(enemy.fightId).css("visibility", "hidden");
                    //Hero attacking enemy
                    var dmg = getRandomInt(gameData.skills.arcania.minBlastDmg, gameData.skills.arcania.maxBlastDmg);
                    var expGained = dmg * 2;
                    gameData.skills.arcania.exp += expGained;
                    gameData.currentArcana -= 5;
                    enemy.currentHealth -= dmg;
                    if (enemy.currentHealth <= 0) {
                        var goldDrop = getRandomInt(enemy.minGoldDrop, enemy.maxGoldDrop);
                        popUp("Loot!", "You find " + goldDrop + " gold on the\ndead " + enemy.name + "'s body!");
                        gameData.goldCount += goldDrop;
                        popUp("Kill!", "You blast the " + enemy.name + " for " + dmg + " damage and kill it! You gain " + enemy.xp + " xp!");
                        gameData.skills.combat.exp += enemy.xp;
                    } else {
                        messageLong("You blast the " + enemy.name + " for " + dmg + " damage!\nYou gain " + expGained + " Arcania exp!", "success");
                    }

                    //enemy attacking hero
                    if (enemy.currentHealth > 0) {
                        setTimeout(function () {
                            var enemyRoll = Math.floor(Math.random() * 100) + 1;
                            var enemyHitChance = enemy.hitChance - gameData.skills.combat.getBlockChance();
                            if (enemyHitChance >= enemyRoll) {
                                var enemyDmg = getRandomInt(enemy.minDamage, enemy.maxDamage);
                                message("The " + enemy.name + " strikes you for " + enemyDmg + " damage!", "error");
                                gameData.currentHealth -= enemyDmg;
                            } else {
                                message("You block the " + enemy.name + "'s attack.", "warn");
                            }
                        }, 2000);
                    } else {
                        enemy.currentHealth = enemy.maxHealth;
                    }

                } else {
                    messageLong("You do not have enough Arcana for this attack.", "error");
                }


                //Reshowing the button after the fight round ends
                setTimeout(function () {
                    $(enemy.blastId).css("visibility", "visible");
                    $(enemy.fightId).css("visibility", "visible");
                }, 4000);

            });

        }

        function checkIfDead() {
            if (gameData.currentHealth <= 0) {
                displayPage("#overviewScreen");
                gameData.currentHealth = 10;
                gameData.skills.hunting.resourceCount = Math.floor(gameData.skills.hunting.resourceCount * .5);
                gameData.skills.woodcutting.resourceCount = Math.floor(gameData.skills.woodcutting.resourceCount * .5);
                gameData.skills.mining.resourceCount = Math.floor(gameData.skills.mining.resourceCount * .5);
                gameData.goldCount = Math.floor(gameData.goldCount * .8);
                $.alert({
                    title: "Ouch!",
                    content: "You wake up in extreme pain and some of your things missing. Nonetheless you are lucky to be alive...",
                    theme: "supervan",
                });
            }
        }

        function renderEquipmentAndInventoryStats() {
            $("#damage").html(gameData.skills.combat.minDamage + " - " + gameData.skills.combat.maxDamage);
            $("#hitChance").html(gameData.skills.combat.getHitChance() + "%");
            $("#blockChance").html(gameData.skills.combat.getBlockChance() + "%");
            $("#huntingBonus").html(gameData.skills.hunting.huntingBonus);
            $("#woodcuttingBonus").html(gameData.skills.woodcutting.woodCuttingBonus);
            $("#miningBonus").html(gameData.skills.mining.miningBonus);
        };

        function showEnemyInfo() {
            for (var enemy in gameData.enemies) {
                try {
                    throw enemy
                } catch (e) {
                    var infoId = "#" + gameData.enemies[e].name + "Info";
                    $(infoId).click(function () {
                        $.alert({
                            title: gameData.enemies[e].name,
                            content: "Health: " + gameData.enemies[e].maxHealth + "<br />" +
                                "Damage: " + gameData.enemies[e].minDamage + " - " + gameData.enemies[e].maxDamage + "<br />" +
                                "Hit Chance: " + gameData.enemies[e].hitChance + "%" + "<br />" +
                                "Block Chance: " + gameData.enemies[e].blockChance + "%",
                            theme: "dark",
                        });
                    });

                }
            }
        }

        function absorbCrystal() {
            $(".absorbCrystal").click(function () {
                if (gameData.skills.mining.resourceCount >= 1) {
                    if (gameData.currentArcana < gameData.maxArcana) {
                        gameData.skills.mining.resourceCount--;
                        gameData.currentArcana++;
                        messageLong("You absorb a crystal and gain 1 Arcana.", "success");
                    } else {
                        messageLong("Your Arcana is already full.", "info");
                    }
                } else {
                    messageLong("You do not have any Arcanic Crystals.", "error");
                }
            });

        }

        function navBarLinkActive() {
            $(".bottomNav li").on("click", function () {
                $(".bottomNav").find(".active").removeClass("active");
                $(this).addClass("active");
            });
        }

        function nextBuyable(buyable) {
            $(buyable.buyId).css("display", "block");
            buyable.visible = true;
        }

        function hellFireCheat() {
            $("#goldCount").click(function () {
                $("#buyHellFireSpear").css("display", "block");
            });
        }

        function nameAndPriceBuyables() {
            for (var category in gameData.buyables) {
                try {
                    throw category
                } catch (cat) {
                    for (var buyable in gameData.buyables[cat]) {
                        try {
                            throw buyable
                        } catch (item) {
                            $(gameData.buyables[cat][item].costId).html("(" + gameData.buyables[cat][item].cost + " gold)");
                        }
                    }
                }
            }
        }

        function showArcaniaInfo() {
            $("#alchemyInfo").click(function () {
                popUpDark("Alchemy", "Alchemy is the act of transmuting physical items to gold. Concentrate and try to transform your logs into gold to hone your skills.")
            });
            $("#hpAlchemyInfo").click(function () {
                popUpDark("High Power Alchemy", "You will blast the log with a high amount of Arcanic Energy. This will have the highest chance of successfully alchemizing the logs but  will result in the least amount of gold.");
            });
            $("#mpAlchemyInfo").click(function () {
                popUpDark("Medium Power Alchemy", "You will blast the log with a medium amount of Arcanic Energy. This will have a moderate chance of successfully alchemizing the logs.");
            });
            $("#lpAlchemyInfo").click(function () {
                popUpDark("Low Power Alchemy", "You will blast the log with a low amount of Arcanic Energy. This will have the lowest chance of successfully alchemizing the logs but will result in the highest amount of gold if successful.");
            });
        }

        function alchemy() {
            $("#hpAlchemyBtn").click(function () {
                alchemize(35, 1, 1);
            });
            $("#mpAlchemyBtn").click(function () {
                alchemize(50, 4, 6);
            });
            $("#lpAlchemyBtn").click(function () {
                alchemize(65, 6, 10);
            });
        }

        function alchemize(threshhold, minGold, maxGold) {
            if (gameData.currentArcana >= 2) {
                if (gameData.skills.woodcutting.resourceCount >= 1) {
                    gameData.currentArcana -= 2;
                    gameData.skills.woodcutting.resourceCount--;
                    var roll = getRandomInt(1, 100);
                    if (roll >= threshhold) {
                        var gold = getRandomInt(minGold, maxGold);
                        messageLong("You successfully alchemize the log into " + gold + " gold.\nYou gain 25 exp.", "success");
                        gameData.goldCount += gold;
                        gameData.skills.arcania.exp += 25;
                    } else {
                        messageLong("The alchemy was unsuccessful", "error");
                    }

                } else {
                    messageLong("You do not have enough logs to do this.", "error");
                }
            } else {
                messageLong("You do not have enough Arcanic Energy to do this.", "error");
            }

        }

        function showAlchemyLogs() {
            $(".alchemyLogCount").html(gameData.skills.woodcutting.resourceCount + "/" + gameData.skills.woodcutting.maxResource);
        }

        function popUp(title, text) {
            $.alert({
                title: title,
                content: text,
                type: "dark",
            });

        }

        function popUpDark(title, text) {
            $.alert({
                title: title,
                content: text,
                type: "orange",
                theme: "dark",
            });

        }

    }


};

app.initialize();
