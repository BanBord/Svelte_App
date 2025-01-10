<!-- @format -->
<script>
  function getRandomBlueColor() {
    const blueShades = ["#0000FF", "#0000CD", "#00008B", "#000080", "#191970", "#4169E1", "#4682B4", "#5F9EA0", "#6495ED", "#87CEEB"];
    const randomIndex = Math.floor(Math.random() * blueShades.length);
    return blueShades[randomIndex];
  }

  const randomBlueColor = getRandomBlueColor();
</script>


<div class="random-blue-background" style="background-color: {randomBlueColor};">
    <!-- Your content here -->
  </div>
  

<style>
        .random-blue-background {
            /* background-color will be set inline */
        }
</style>


