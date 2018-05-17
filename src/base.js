let vm =new Vue({
    el: '.wrap',
    data: {
        health1: 100,
        health2: 100,
        logs: [],
        runing: false
    },
    methods:{
        start:() => {
            vm.health1 = 100;
            vm.health2 = 100;
            vm.logs = [];
            vm.runing = true;
        },
        hit:() =>{
            let d , h;
            h = vm.damage(3 , 8);
            d = {
                info:'你捶了一下boss造成' + h + '点伤害！',
                isP: true
            }
            vm.health2 -= h;
            if(vm.health2 <= 0){
                vm.health2 = 0;
            }
            vm.logs.unshift(d);
            if(vm.isWin()){
                return;
            }
            d = {
                info:'boss朝天一吼，吓掉了你' + vm.boosHit() + '点生命值！',
                isP: false
            }
            vm.logs.unshift(d);
            vm.isWin();
        },
        hitHard: () => {
            let d , h;
            h = vm.damage(9 , 16);
            d = {
                info:'你使用天雷术对boss造成' + h + '点伤害！',
                isP: true
            }
            vm.health2 -= h;
            if(vm.health2 <= 0){
                vm.health2 = 0;
            }
            vm.logs.unshift(d);
            if(vm.isWin()){
                return;
            }
            d = {
                info:'boss朝天一吼，吓掉了你' + vm.boosHit() + '点生命值！',
                isP: false
            }
            vm.logs.unshift(d);
            vm.isWin();
        },
        damage: (min , max) => {
            return 0|(Math.random()*(max - min + 1) + min);
        },
        boosHit:() => {
            let d = vm.damage(6 , 12)
            vm.health1 -= d;
            if(vm.health1 <= 0){
                vm.health1 = 0;
            }
            return d;
        },
        isWin:() => {
            if(vm.health2 == 0){
                vm.end('成功保护地球，再来？');
                return true;
            }
            if(vm.health1 == 0){
                vm.end('丧生兽腹，世界末日，再来？')
                return true;
            }
        },
        end: (str) => {
            if(confirm(str)){
                    vm.start();
                    vm.runing = false;
                }else{
                    vm.runing = false;
                }
        },
        cure:() => {
            let d;
            vm.health1 += 11;
            if(vm.health1 > 100){
                vm.health1 = 100;
            }
            d = {
                info:'你嗑了一包五石散回复11点生命值！',
                isP: true
            }
            vm.logs.unshift(d);
            d = {
                info:'boss朝天一吼，吓掉了你' + vm.boosHit() + '点生命值！',
                isP: false
            }
            vm.logs.unshift(d);
            vm.isWin();
        },
        giveUp: () => {
            vm.end('你居然怂了！');
        }
    }
})