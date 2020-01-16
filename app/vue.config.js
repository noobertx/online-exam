const path = require('path')

module.exports={
	outputDir:path.resolve(__dirname,'mobile-cta-client'),
	devServer:{
		proxy:{
			'/api':{
				target:'http://localhost:5000/'
			}
		}
	}
}