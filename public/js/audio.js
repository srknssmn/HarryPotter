// makes playing audio return a promise
function playAudio(audio){
    return new Promise(res=>{
      audio.play()
      audio.onended = res
    })
  }
  
  // how to call
  async function test(){
    const audio = new Audio('<url>')
    await playAudio(audio)
    // code that will run after audio finishes...
  }