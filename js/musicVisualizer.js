musicVisualizer.ac = new(window.AudioContext || window.webkitAudioContext)();

function musicVisualizer(obj) {
	this.source = null;
	this.analyser = musicVisualizer.ac.createAnalyser();
	this.size = obj.size;
	this.analyser.fftSize = this.size * 2;
	this.xhr = new XMLHttpRequest();
	this.analyser.connect(musicVisualizer.ac.destination);
	this.visualizer = obj.visualizer;
	this.visualize();
}
musicVisualizer.prototype.load = function(url, fun) {
	this.xhr.abort();
	this.xhr.open("GET",url);	
	this.xhr.responseType = "arraybuffer";
	var self = this;
	this.xhr.onload = function() {
		fun(self.xhr.response);
	};
	//this.xhr.setRequestHeader( 'Origin', '*');
	this.xhr.send();
};
musicVisualizer.prototype.decode = function(arraybuffer, fun) {
	musicVisualizer.ac.decodeAudioData(arraybuffer, function(buffer) {
		fun(buffer);
	}, function(err) {
		console.log(err);
	});
};
musicVisualizer.prototype.stop = function() {
	this.source[this.source.stop ? "stop" : "noteOff"](0);
};
musicVisualizer.prototype.visualize = function() {
	var arr = new Uint8Array(this.analyser.frequencyBinCount);
	requestAnimationFrame = window.requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame;
	var self = this;

	function v() {
		self.analyser.getByteFrequencyData(arr);
		self.visualizer(arr);
		requestAnimationFrame(v);
	}
	requestAnimationFrame(v);
};
musicVisualizer.prototype.play = function(url) {
	var self = this;
	this.source && this.stop();
	this.load(url, function(arraybuffer) {
		self.decode(arraybuffer, function(buffer) {
			var bs = musicVisualizer.ac.createBufferSource();
			bs.connect(self.analyser);
			bs.buffer = buffer;
			bs[bs.start ? "start" : "noteOn"](0);
			self.source = bs;
		});
	});
};
