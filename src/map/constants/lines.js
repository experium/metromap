import { find, propEq, flatten, filter, uniqBy, prop, sortBy } from 'ramda';

export const LINES = [
    {
        type: 'red',
        name: 'Красная',
        color: '#ED0004',
        stations: [
            {
                id: 'red_1',
                name: 'Девяткино',
                x: 556,
                y: 124
            },{
                id: 'red_2',
                name: 'Гражданский проспект',
                x: 556,
                y: 166
            },{
                id: 'red_3',
                name: 'Академическая',
                x: 556,
                y: 222
            },{
                id: 'red_4',
                name: 'Политехническая',
                x: 556,
                y: 265
            },{
                id: 'red_5',
                name: 'Площадь Мужества',
                x: 556,
                y: 307
            },{
                id: 'red_6',
                name: 'Лесная',
                x: 556,
                y: 350
            },{
                id: 'red_7',
                name: 'Выборгская',
                x: 556,
                y: 393
            },{
                id: 'red_8',
                name: 'Площадь Ленина',
                x: 556,
                y: 435
            },{
                id: 'red_9',
                name: 'Чернышевская',
                x: 556,
                y: 552
            },{
                id: 'red_10',
                name: 'Площадь Восстания',
                x: 556,
                y: 606,
                transfer: true,
                textPosition: 'topRight',
                textWidth: 140
            },
            {
                helpful: true,
                x: 556,
                y: 695
            },
            {
                helpful: true,
                x: 550,
                y: 712
            },{
                id: 'red_11',
                name: 'Владимирская',
                x: 540,
                y: 722,
                transfer: true,
                textPosition: 'bottomRight',
                extraX: 3
            },{
                id: 'red_12',
                name: 'Пушкинская',
                x: 432,
                y: 785,
                transfer: true,
                extraY: -2
            },{
                id: 'red_13',
                name: 'Технологический институт',
                x: 331,
                y: 844,
                transfer: true,
                textPosition: 'topLeft',
                extraY: 20,
                checkConnectors: ['blue_11']
            },{
                id: 'red_14',
                name: 'Балтийская',
                x: 223,
                y: 906,
                textPosition: 'topLeft'
            },
            {
                helpful: true,
                x: 186,
                y: 928
            },
            {
                helpful: true,
                x: 174,
                y: 939
            },
            {
                helpful: true,
                x: 167,
                y: 954
            },{
                id: 'red_15',
                name: 'Нарвская',
                x: 166,
                y: 963
            },{
                id: 'red_16',
                name: 'Кировский завод',
                x: 166,
                y: 1003
            },{
                id: 'red_17',
                name: 'Автово',
                x: 166,
                y: 1058
            },{
                id: 'red_18',
                name: 'Ленинский проспект',
                x: 166,
                y: 1098
            },{
                id: 'red_19',
                name: 'Проспект Ветеранов',
                x: 166,
                y: 1152
            }
        ]
    },
    {
        type: 'blue',
        name: 'Синяя',
        color: '#3A70BB',
        stations: [
            {
                id: 'blue_1',
                name: 'Парнас',
                x: 404,
                y: 124
            },
            {
                id: 'blue_2',
                name: 'Проспект Просвящения',
                x: 404,
                y: 156
            },
            {
                id: 'blue_3',
                name: 'Озерки',
                x: 404,
                y: 202
            },
            {
                id: 'blue_4',
                name: 'Удельная',
                x: 404,
                y: 234
            },
            {
                id: 'blue_5',
                name: 'Пионерская',
                x: 404,
                y: 267
            },
            {
                id: 'blue_6',
                name: 'Черная речка',
                x: 404,
                y: 299
            },
            {
                id: 'blue_7',
                name: 'Петроградская',
                x: 404,
                y: 398
            },
            {
                helpful: true,
                x: 404,
                y: 451
            },
            {
                helpful: true,
                x: 407,
                y: 468
            },
            {
                id: 'blue_8',
                name: 'Горьковская',
                x: 415,
                y: 482,
                textPosition: 'topRight'
            },
            {
                helpful: true,
                x: 439,
                y: 505
            },
            {
                helpful: true,
                x: 445,
                y: 515
            },
            {
                helpful: true,
                x: 448,
                y: 531
            },
            {
                id: 'blue_9',
                name: 'Невский проспект',
                x: 448,
                y: 606,
                transfer: true,
                textPosition: 'topLeft',
                textWidth: 80,
                extraY: 12,
                extraX: 3
            },
            {
                helpful: true,
                x: 448,
                y: 657
            },
            {
                helpful: true,
                x: 445,
                y: 672
            },
            {
                helpful: true,
                x: 435,
                y: 684
            },
            {
                id: 'blue_10',
                name: 'Сенная площадь',
                x: 368,
                y: 722,
                transfer: true,
                textPosition: 'bottomRight',
                extraY: 10
            },
            {
                helpful: true,
                x: 354,
                y: 731
            },
            {
                helpful: true,
                x: 344,
                y: 740
            },
            {
                helpful: true,
                x: 339,
                y: 755
            },
            {
                id: 'blue_11',
                name: 'Технологический институт',
                x: 339,
                y: 828,
                transfer: true,
                hideText: true,
                checkConnectors: ['red_13']
            },
            {
                id: 'blue_12',
                name: 'Фрунзенская',
                x: 339,
                y: 907
            },
            {
                id: 'blue_13',
                name: 'Московские Ворота',
                x: 339,
                y: 947
            },
            {
                id: 'blue_14',
                name: 'Электросила',
                x: 339,
                y: 990
            },
            {
                id: 'blue_15',
                name: 'Парк Победы',
                x: 339,
                y: 1028
            },
            {
                id: 'blue_16',
                name: 'Московская',
                x: 339,
                y: 1070
            },
            {
                id: 'blue_17',
                name: 'Звездная',
                x: 339,
                y: 1111
            },
            {
                id: 'blue_18',
                name: 'Купчино',
                x: 339,
                y: 1152
            }
        ]
    },
    {
        type: 'green',
        name: 'Зеленая',
        color: '#329244',
        stations: [
            // {
            //     id: 'green_11',
            //     name: 'Беговая',
            //     x: 102,
            //     y: 298
            // },
            // {
            //     id: 'green_12',
            //     name: 'Новокрестовская',
            //     x: 102,
            //     y: 393
            // },
            // {
            //     helpful: true,
            //     x: 102,
            //     y: 479
            // },
            // {
            //     helpful: true,
            //     x: 104,
            //     y: 498
            // },
            {
                id: 'green_1',
                name: 'Приморская',
                x: 114,
                y: 513,
                textPosition: 'bottomLeft'
            },
            {
                id: 'green_2',
                name: 'Василеостровская',
                x: 187,
                y: 586,
                textPosition: 'bottomLeft'
            },
            {
                helpful: true,
                x: 212,
                y: 612
            },
            {
                helpful: true,
                x: 220,
                y: 617
            },
            {
                helpful: true,
                x: 234,
                y: 620
            },
            {
                id: 'green_3',
                name: 'Гостиный Двор',
                x: 459,
                y: 620,
                transfer: true,
                textPosition: 'topRight',
                textWidth: 70,
                extraY: 17
            },
            {
                id: 'green_4',
                name: 'Маяковская',
                x: 567,
                y: 620,
                transfer: true,
                textPosition: 'bottomRight',
                extraX: 3
            },
            {
                helpful: true,
                x: 659,
                y: 622
            },
            {
                helpful: true,
                x: 677,
                y: 631
            },
            {
                helpful: true,
                x: 685,
                y: 650
            },
            {
                id: 'green_5',
                name: 'Площадь Александра Невского',
                x: 685,
                y: 694,
                transfer: true,
                textPosition: 'topRight',
                textWidth: 90,
                extraY: 22,
                checkConnectors: ['orange_4']
            },
            {
                id: 'green_6',
                name: 'Елизаровская',
                x: 685,
                y: 878
            },
            {
                id: 'green_7',
                name: 'Ломоносовкая',
                x: 685,
                y: 946
            },
            {
                id: 'green_8',
                name: 'Пролетарская',
                x: 685,
                y: 1014
            },
            {
                id: 'green_9',
                name: 'Обухово',
                x: 685,
                y: 1083
            },
            {
                id: 'green_10',
                name: 'Рыбацкое',
                x: 685,
                y: 1151
            }
        ]
    },
    {
        type: 'orange',
        name: 'Оранжевая',
        color: '#F2A820',
        hideStartNumber: true,
        stations: [
            // {
            //     id: 'orange_9',
            //     name: 'Горный институт',
            //     x: 122,
            //     y: 679,
            //     textPosition: 'bottomLeft',
            //     textWidth: 80
            // },
            // {
            //     helpful: true,
            //     x: 142,
            //     y: 699
            // },
            // {
            //     helpful: true,
            //     x: 162,
            //     y: 707
            // },
            // {
            //     id: 'orange_10',
            //     name: 'Театральная',
            //     x: 258,
            //     y: 707,
            //     textPosition: 'bottomLeft',
            //     extraY: -4,
            //     extraX: -4
            // },
            {
                id: 'orange_1',
                name: 'Спасская',
                x: 359,
                y: 707,
                transfer: true,
                textPosition: 'topRight',
                textWidth: 90,
                extraX: 37,
                extraY: 7
            },
            {
                id: 'orange_2',
                name: 'Достоевская',
                x: 531,
                y: 707,
                transfer: true,
                textPosition: 'topLeft',
                textWidth: 100,
                extraY: 7,
                extraX: -15
            },
            {
                id: 'orange_3',
                name: 'Лиговский проспект',
                x: 624,
                y: 707,
                textWidth: 90,
                textCenter: true,
                extraX: 13,
                extraY: 32
            },
            {
                id: 'orange_4',
                name: 'Площадь Александра Невского',
                x: 697,
                y: 707,
                transfer: true,
                hideText: true,
                checkConnectors: ['green_5']
            },
            {
                id: 'orange_5',
                name: 'Новочеркасская',
                x: 809,
                y: 707,
                textPosition: 'topRight',
                extraX: 18,
                extraY: 6
            },
            {
                helpful: true,
                x: 833,
                y: 708
            },
            {
                helpful: true,
                x: 844,
                y: 712
            },
            {
                helpful: true,
                x: 853,
                y: 722
            },
            {
                helpful: true,
                x: 858,
                y: 735
            },
            {
                id: 'orange_6',
                name: 'Ладожская',
                x: 859,
                y: 748
            },
            {
                id: 'orange_7',
                name: 'Проспект Большевиков',
                x: 859,
                y: 805
            },
            {
                id: 'orange_8',
                name: 'Улица Дыбенко',
                x: 859,
                y: 877
            }
        ]
    },
    {
        type: 'purple',
        name: 'Фиолетовая',
        color: '#652C91',
        stations: [
            {
                id: 'purple_1',
                name: 'Комендантский проспект',
                x: 253,
                y: 253
            },
            {
                id: 'purple_2',
                name: 'Старая Деревня',
                x: 253,
                y: 299
            },
            {
                id: 'purple_3',
                name: 'Крестовский Остров',
                x: 253,
                y: 384
            },
            {
                id: 'purple_4',
                name: 'Чкаловская',
                x: 253,
                y: 448
            },
            {
                id: 'purple_5',
                name: 'Спортивная',
                x: 253,
                y: 489
            },
            {
                helpful: true,
                x: 254,
                y: 499
            },
            {
                helpful: true,
                x: 261,
                y: 512
            },
            {
                helpful: true,
                x: 307,
                y: 559
            },
            {
                helpful: true,
                x: 318,
                y: 584
            },
            {
                id: 'purple_6',
                name: 'Адмиралтейская',
                x: 318,
                y: 649,
                textPosition: 'left',
                extraX: 3
            },
            {
                helpful: true,
                x: 319,
                y: 681
            },
            {
                helpful: true,
                x: 326,
                y: 696
            },
            {
                id: 'purple_7',
                name: 'Садовая',
                x: 350,
                y: 722,
                transfer: true,
                textPosition: 'bottomLeft',
                extraY: 6,
                extraX: 3
            },
            {
                id: 'purple_8',
                name: 'Звенигородская',
                x: 432,
                y: 802,
                transfer: true,
                extraY: -1
            },
            {
                id: 'purple_9',
                name: 'Обводный канал',
                x: 491,
                y: 863,
                textPosition: 'topRight'
            },
            {
                helpful: true,
                x: 504,
                y: 877
            },
            {
                helpful: true,
                x: 510,
                y: 889
            },
            {
                id: 'purple_10',
                name: 'Волковская',
                x: 512,
                y: 907
            },
            {
                id: 'purple_11',
                name: 'Бухарестская',
                x: 512,
                y: 956
            },
            {
                id: 'purple_12',
                name: 'Международная',
                x: 512,
                y: 1005
            },
            // {
            //     id: 'purple_13',
            //     name: 'Проспект Славы',
            //     x: 512,
            //     y: 1054
            // },
            // {
            //     id: 'purple_14',
            //     name: 'Дунайская',
            //     x: 512,
            //     y: 1104
            // },
            // {
            //     id: 'purple_15',
            //     name: 'Шушары',
            //     x: 512,
            //     y: 1151
            // }
        ]
    }
];

export const CONNECTORS = [
    ['green_3', 'blue_9'],
    ['green_4', 'red_10'],
    ['orange_1', 'purple_7', 'blue_10'],
    ['orange_2', 'red_11'],
    ['orange_4', 'green_5'],
    ['red_12', 'purple_8'],
    ['red_13', 'blue_11']
].map(connector => flatten(connector.map(id => {
    const station = find(propEq('id', id), flatten(LINES.map(line => line.stations)));
    return [station.x, station.y];
})));

const getStations = () => {
    const stations = flatten(LINES.map(({ stations }, index) =>
        filter(({ helpful }) => !helpful, stations).map(({ id, name }) => ({
            id,
            title: name,
            lines: [index + 1],
            checks: [id]
        }))
    ));

    return sortBy(prop('title'), uniqBy(prop('title'), stations.map(station => {
        const sameStation = find(s => s.title === station.title && s.id !== station.id, stations);

        return sameStation ? {
            ...station,
            lines: station.lines.concat(sameStation.lines),
            checks: station.checks.concat(sameStation.checks)
        } : station;
    })));
}

export const SPB_STATIONS = getStations();
