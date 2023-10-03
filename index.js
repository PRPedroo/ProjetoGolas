const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const timerElement = document.getElementById('timer')
var seconds = 0
var spawn = 1

const enemies = []

canvas.width = 1024
canvas.height = 576

const vel = 4

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite{
	constructor({position, velocity}){
		this.position = position
		this.velocity = velocity
	}

	draw(color){
		c.fillStyle = color
		c.fillRect(this.position.x, this.position.y, 30, 30)
	}

	follow(player){
		if (this.position.x - player.position.x <= 200 && this.position.x - player.position.x >= -200 
						&& this.position.y - player.position.y <= 200 && this.position.y - player.position.y >= -200){

			if(this.position.x > player.position.x){
				this.velocity.x = -vel/2
			}if (this.position.x < player.position.x){
				this.velocity.x = vel/2
			}if (this.position.y < player.position.y){
				this.velocity.y = vel/2
			}if (this.position.y > player.position.y){
				this.velocity.y = -vel/2
			}
		}
		else{
			this.velocity.x = 0
			this.velocity.y = 0
		}
	}

	update(color){
		this.draw(color)

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + 30 >= canvas.height){
			this.position.y = canvas.height - 30
		}
		if (this.position.x + 30 >= canvas.width){
			this.position.x = canvas.width - 30
		}
		if (this.position.y <= 0){
			this.position.y = 0
		}
		if (this.position.x <= 0){
			this.position.x = 0
		}
	}
}

const player = new Sprite({
	position: {
		x: (canvas.width/2) - 200,
		y: (canvas.height/2)
	},
	velocity: {
		x: 0,
		y: 0
	}
})

const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	},
	ArrowUp: {
		pressed: false
	},
	ArrowLeft: {
		pressed: false
	},
	ArrowDown: {
		pressed: false
	},
	ArrowRight: {
		pressed: false
	}
}

function animate(){
	window.requestAnimationFrame(animate)
	c.fillStyle = '#37373B'
	c.fillRect(0, 0, canvas.width, canvas.height)
	player.update('#EAD138')
	updateEnemies();

	player.velocity.x = 0
	player.velocity.y = 0

	if(keys.w.pressed){
		player.velocity.y = -vel
	}if (keys.a.pressed){
		player.velocity.x = -vel
	}if (keys.s.pressed){
		player.velocity.y = vel
	}if (keys.d.pressed){
		player.velocity.x = vel
	}


	if(seconds%5 == 0 && spawn == 1){
		enemies.push(new Sprite({ 
			position: {
				x: Math.random() * canvas.width, 
				y: Math.random() * canvas.height
			}, 
			velocity: {
				x: 0,
				y: 0 
			} 
		}))
		spawn = 0
	}else if (seconds%5 != 0 && spawn == 0){
		spawn = 1
	}
}

window.addEventListener('keydown', (event) => {
	switch (event.key){
	case 'w':
		keys.w.pressed = true
		break

	case 'a':
		keys.a.pressed = true
		break

	case 's':
		keys.s.pressed = true
		break

	case 'd':
		keys.d.pressed = true
		break

	case 'ArrowUp':
		keys.ArrowUp.pressed = true
		break

	case 'ArrowLeft':
		keys.ArrowLeft.pressed = true
		break

	case 'ArrowDown':
		keys.ArrowDown.pressed = true
		break

	case 'ArrowRight':
		keys.ArrowRight.pressed = true
		break
	}
})

window.addEventListener('keyup', (event) => {
	switch (event.key){
	case 'w':
		keys.w.pressed = false
		break

	case 'a':
		keys.a.pressed = false
		break

	case 's':
		keys.s.pressed = false
		break

	case 'd':
		keys.d.pressed = false
		break

	case 'ArrowUp':
		keys.ArrowUp.pressed = false
		break

	case 'ArrowLeft':
		keys.ArrowLeft.pressed = false
		break

	case 'ArrowDown':
		keys.ArrowDown.pressed = false
		break

	case 'ArrowRight':
		keys.ArrowRight.pressed = false
		break
	}
})

animate()

setInterval(function() {
	seconds++;
	timerElement.textContent = seconds;
}, 1000);

function updateEnemies() {
	for (let i = 0; i < enemies.length; i++) {
		const sprite = enemies[i]
    	sprite.update('#EA798A')
    	sprite.follow(player)
  	}
}