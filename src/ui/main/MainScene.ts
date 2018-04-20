class MainScene extends Scene.SceneBase{
    onEnter() {
        super.onEnter();
        let self = this;
        console.log('userInfo:', self.data);
        MainCityView.show();
    }
}