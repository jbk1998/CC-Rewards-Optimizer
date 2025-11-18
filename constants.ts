import { Card, MCCGroup } from './types';

export const USER_CARDS: Card[] = [
  {
    id: 'card-2',
    issuer: 'American Express',
    productName: 'Gold Card',
    network: 'Amex',
    rewardProfile: {
      baseRate: 1,
      rules: [
        { mccGroup: MCCGroup.Dining, multiplier: 4 },
        { mccGroup: MCCGroup.Grocery, multiplier: 4 },
      ],
    },
    imageUrl: 'data:image/png;base64,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',
    isActive: true,
  },
  {
    id: 'card-1',
    issuer: 'Chase',
    productName: 'Sapphire Reserve',
    network: 'Visa',
    rewardProfile: {
      baseRate: 1,
      rules: [
        { mccGroup: MCCGroup.Dining, multiplier: 3 },
        { mccGroup: MCCGroup.Travel, multiplier: 3 },
      ],
    },
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAqCAYAAADG4iEMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMHSURBVGhD7Zk/aBxlGMd/d1eLIdYirGDSiGAbRbC1goWNpUiJdWsLpVgpQoiFm8FCSxQuq1iI/wCFQLdQixYpKsFCFYsFFGthIUhFNWpcu0hVjDFn+C65yS67u929+wN/cMnd78z7eZ5535nFMIYQQgghhBDyEru7u202G5vNptfrm5ubQRgGkiQURcFms8FgMFkul9lkMplMJpPJoFAoFotBkqS6rlarlUwmMxgMSJLk+/3ZbDZd10+n036/H4/H0XQdBEGaps/nc6ZpBEGg6zpJEgRBKIoSiUSCIBhzHEdRlMlkGI/HjccjhiFiGAaCgCiKkiRBECQIgjiOYRhJksYYYwwRhiESiQQhBEGAIArrurquUqnk8/lqtRqtVqvVarVaLVar1Wq1WuVyOUEQgiBAkiQIgiiKiqIoirqum6ZxHMdxnCdJGIbh8/lEUbqum6ZBEARBEARBkGUZhiGZTKaIiKIo8jyfpmmKoizLkiRJEgDGGGNMkiRxHOf7+/t+v99sNpvN5nQ6ndfrpVLpn5+vHMdf+T/g/w2dTufw8PDm5ubGxsZMJlMqlbquS5JkkiQ9z/f7/TAMh8Phfr8/nU6bpmmKoiiKgiAIAqIoGg6HTU1NBEGAIAgRhiFBEARBkGUZhiGEEEIIIYQQQijLshzHNE03NjZmGAaCIOI4LpVKBEHI5XI4jru6ujocDl3XlWX5arWq6zodDpvN5g/gf0ev18vlcrlcLl3XURTpdDrTNM/n836/n+d5QRB83/8W/oA/GUpfB8t4rT0AAAAASUVORK5CYII=',
    isActive: true,
  },
  {
    id: 'card-5',
    issuer: 'American Express',
    productName: 'Platinum Card',
    network: 'Amex',
    rewardProfile: {
      baseRate: 1,
      rules: [{ mccGroup: MCCGroup.Travel, multiplier: 5 }],
    },
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAqCAYAAADG4iEMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMASURBVGhD7Zk/aBxlGMd/d3dhi7G0UjBpNIhtFLG1gp2NpUirW1soxUoQQizcDAYtUbhaxUJYoJRIh7pYoSKJhVLBQhGLhRBBlWjUuHaRqhgj5ozfJXe5yS67u929+wN/cMnd78z7eZ5535nFEEIIIYQQQgh5id1uV6lUarXaYrEwDMM0zaIoWq1WkiQxDINlWdI0jWVZlmVZlmVZlmXbtoIg2Lbter2eJEla12VZFgRBkiQIgiiKYhgmSRLbtv1+vyAIHMdJkozH4zRNW1dXJ4qiJElxHCeKYhiGNE1BEARBEARBkCRJEgRBCEEIIYQQQghBEARBEARBUBRFUZIkURTFcZxpmjiO27ZBEKjrer1e27Zt23Ycx3me8zwURcFxnCiKz+ezrutoOhzHsW3bNE08z/d9v67rBEGIooiiaJommqa6rtu2bdu2IYS2bdu2XVdVVV1XVVUxDAshhLquuq6KomiaPjw8PDw8nJ+f7+/vd7vdqqoaDAbZto1h2O/3h4eHNE1JkiRJEoIgxBjDGGNM0/T7/RzH2dvb8/l8NBoNhmFBEGiahmFYVVWVSiWKoiiKIgjyf/H/pFarNTg4OD09vbm52Ww2q6oqiuJM00qlUrvd7na70+m0rusEQRCj+L7/LfzBD6M+Xw/o65nUAAAAAElFTkSuQmCC',
    isActive: true,
  },
  {
    id: 'card-6',
    issuer: 'Bilt Rewards',
    productName: 'Bilt Mastercard',
    network: 'Mastercard',
    rewardProfile: {
        baseRate: 1,
        rules: [
            { mccGroup: MCCGroup.Dining, multiplier: 3 },
            { mccGroup: MCCGroup.Travel, multiplier: 2 },
        ],
    },
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAqCAYAAADG4iEMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFESURBVGhD7Zm/TgJBFMVnFStAYi+AhcTEMzDWJzDWJzDGHsBCQsJCYi+AhcReICGhpQ1q/4vczL4zOzPO5gs/ucw5Z+aeu3cXhRBCCCGEEEII4T10dXXJ5/MqlUqlUhkMhjiOgyCgadrtdrvdbqVSabVaEARBEKSqqlwup9frEARBELjd7nA4EARBEAQBhmGz2RwMBtVqNQiCpmmSJCEI2q5rGAZJkmEYpmk6Ho/1ej0IgrZt8zwvSRLbtuM4zmazLMsmk4lEIoQQmqaZTqeVSiWGYTiO8zzfun6/gYhEIpHkr4Ig+Hy+fr9frVZBEARBkCiKYRhBEKjrer1ejuMYhhVG8f+A/w1er1culyuVStM0wzCM4+h6vYQQ3/e/hT/gE11Xl8/wz54AAAAASUVORK5CYII=',
    isActive: true,
  },
  {
    id: 'card-4',
    issuer: 'Capital One',
    productName: 'Venture X',
    network: 'Visa',
    rewardProfile: {
      baseRate: 2,
      rules: [],
    },
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAqCAYAAADG4iEMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFJSURBVGhD7ZnBSsNAFEW/qMUt2IqXIoqXHiwIiqAePIgHr6KHFx+h//8LXkTvfoOexEupgxYtqAVB8WqS0TadjcllDnxwSCYzO+fMm5lJMIYQQgghhBDyEru7u9VqtVwu12q1xsbGEJlMhohMJkOkVqsRKRQK6XT6cDjUajXy+fxer/d0Oq3X6xFCpFKpRCJBkqRSqSQSCVqtVqlUIoRyuRwOh8Nut7u7u0Kh0Ol0arXaZrOpVqtSqXQ4HIQQQRACgQBBEARBCCGEECRJIm3btm3btm3btm3bdpIkSVEUxbIsyzJN03ie7/f7rutBEOT7/VwuF47jJEkqFArxeDye5xFCpmnGeX4ymXg8HgzD/H5/v99vNptOp9PpdOr1-g/g/7Jer8/Pz09PT4+NjdXp9Jydnfn9/larlcvlEEXp+/4b+AP60Wd5jAyL3wAAAABJRU5ErkJggg==',
    isActive: false,
  },
  {
    id: 'card-3',
    issuer: 'Citi',
    productName: 'Custom Cash',
    network: 'Mastercard',
    rewardProfile: {
      baseRate: 1,
      rules: [
        { mccGroup: MCCGroup.Gas, multiplier: 5 },
      ],
    },
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAqCAYAAADG4iEMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIBSURBVGhD7Zk/aBxFFMd/q6iNNhYpKSWNVbCIsbQriBYFK1uFFIKtWliKhbYQBbW0EsFCFEFAsbAQxNoiCFqIKEIExU7ETnYWgoAm5q/Ed8kFd93lzrv7gQ/c5G7fzHzz5s3MDFQqlUqlUqlU/g/hLz/d7/dP0ev1o1ark5OTs91ut9vtfD5/VFVVlQ6HQ6vVyuVyGQqF2Gw2LpdLNpsNer3+yM/Pj8dxHH/r9/s5HA46nU6tVuvz+VStVjUajWQyGZvNhs/n0+v1uFwuvV4vj8fD6XRarVa5XA6fz4fP51OpVDKZDAqFmEwmubk5+fn5NBoNpVIpl8vlcrlwONzt6enp8Xj29/eHw+FkMpnX622z2bjdbrlcrlQqzefz+Xx+IBDA8zyfzwdBEOI4jiRJnue3t7d7vd6uri75fL7f75fL5SLLshzHwTAMw3C5XIQQQRBkWZZhGEIIIYQQQogkSRzHpmmabdu2bZIkURRFUfR8Pr/RaCiKSiQSBEHAeZ63bVvXddM0URTFcZwoitZ127ZtEARBEARBEARBkGUZhiGZTKaIiKIo8jyfpmmKoizLkiRJEgDGGGNMkiRxHOf7+/t+v99sNpvN5nQ6ndfrpVLpn5/r5XL5D+B/R6vVmp2d/bO0tLSlpaXJZDIej99ut4uiqPM8kiR13/8W/oA/0mF85fa3B4wAAAAASUVORK5CYII=',
    isActive: false,
  },
];

export const MOCK_METRICS_DATA = {
  accuracy: [
    { name: 'Jan', value: 82 },
    { name: 'Feb', value: 85 },
    { name: 'Mar', value: 86 },
    { name: 'Apr', value: 88 },
    { name: 'May', value: 91 },
    { name: 'Jun', value: 92 },
  ],
  rewardLift: [
    { name: 'Dining', value: 1.8 },
    { name: 'Grocery', value: 2.5 },
    { name: 'Gas', value: 3.1 },
    { name: 'Travel', value: 1.5 },
    { name: 'Retail', value: 0.8 },
    { name: 'Other', value: 0.5 },
  ],
};