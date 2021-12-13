<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta name="viewport" content="width=device-width">
    <title>demineur made in 67</title>
    <meta charset="UTF-8">
    <meta name="description" content="test articles en js oop">
    <meta name="keywords" content="demineur alsace 67 bas-rhin mine">
    <meta name="author" content="Chelomo ZERBIB">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <link href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined"> 
    <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> -->
    <link href="https://fonts.googleapis.com/css2?family=Cookie&family=Open+Sans:ital,wght@1,300&family=Roboto+Condensed:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">

</head>
<body class="container-fluid">

<!-- <div id="background_wrapper"> -->
    <img id ="bg_1" src="img/backgroundimage1.jpg" class="img-fluid image_background">
    <img id ="bg_2" src="img/backgroundimage2.jpg" class="img-fluid image_background">
    <img id ="bg_3" src="img/backgroundimage3.jpg" class="img-fluid image_background">
    <img id ="bg_4" src="img/backgroundimage4.jpg" class="img-fluid image_background">
    <img id ="bg_5" src="img/backgroundimage5.jpg" class="img-fluid image_background">
    <!-- <img id ="bg_6" src="img/backgroundimage6.jpg" class="img-fluid image_background"> -->

    <section class=" d-flex justify-content-around" id="banniere_haut">

        
        <h1 class="display-4  text-center text-danger ">
            Démineur alsacien
        </h1>
        <div id="settings_button">
                
            <span id="settings_button_span" class="material-icons-outlined">settings</span>
        
        </div>

    </section >

    <section class="text-center mt-3" id="section_param" >
        <div id="settings_button_mobile" >
            <span  id="settings_button_span_mobile"class="material-icons-outlined">menu</span>
        </div>


        <div id="settings_window" 
            <?php
                if ((isset($_POST['lines_game'])) && (isset($_POST['columns_game'])) &&
                    (isset($_POST['mines_game'])))
                    {echo 'style="display:none"';}
            ?>  >
            <form action="#" method="post" class="text-center my-3 mb-0" id="form_param">
                <div>

                  <label id="label_lignes" for="lines_game">lignes (5 - 30)</label>
                  <input type="range" id="lines_game" name="lines_game" class="" min="5" max="30" 
                  value="<?= isset($_POST['lines_game']) ? $_POST['lines_game'] : 10 ?>"
                  oninput="this.nextElementSibling.value = this.value">
                  <output class="text-danger" id="output_num1"><?= isset($_POST['lines_game']) ? $_POST['lines_game'] : 10 ?></output>

                </div>
                <div>
                  <label id="label_columns" for="columns_game">colonnes (5 - 30)</label>
                  <input type="range" id="columns_game" name="columns_game" class="" min="5" max="30" 
                  value="<?= isset($_POST['columns_game']) ? $_POST['columns_game'] : 10 ?>"
                  oninput="this.nextElementSibling.value = this.value">
                  <output class="text-danger" id="output_num2"><?= isset($_POST['columns_game']) ? $_POST['columns_game'] : 10 ?></output>
                    
                </div>
                <div>
                  <div>
                        <label for="mines_game">nombre de mines</label>
                        <input type="number" id="mines_game" name="mines_game" min="1" max="855" 
                        value="<?= isset($_POST['mines_game']) ? $_POST['mines_game'] : 15 ?>">          
                  </div>  
                  <div class="mt-2">
                        <label for="pct_mines_game">% de mines</label>
                        <input type="number" id="pct_mines_game" name="pct_mines_game" min="1" max="95" value="15">
                  </div>
                </div>

              <input class="mt-3" type="submit" value="Démarrer">
            </form>    
        </div>


          
    </section>

    <section class=" text-center mx-auto " id="game_plan">
        <?php 
            if ((isset($_POST['lines_game'])) &&
                (isset($_POST['columns_game'])) &&
                (isset($_POST['mines_game'])))
            {
        ?>

                <div class="text-primary text-center mb-3" id="taille_actual">
                    <?php echo
                    '<span id ="nb_lines_dis">'. 
                    $_POST['lines_game'].
                    '</span>'.
                    ' lignes X '.
                    '<span id ="nb_columns_dis">'.
                    $_POST['columns_game'].
                    '</span>'.
                    ' colonnes X '.
                    '<span id ="nb_mines_dis">'.
                    $_POST['mines_game'].
                    '</span>'.
                    ' mines'; 
                    ?>  
                </div>

        <?php
            }else{
        ?> 
                <div class="text-primary text-center mb-3" id="taille_actual" style="display:none;">
                    <span id ="nb_lines_dis">0</span> lignes X 
                    <span id ="nb_columns_dis">0</span> colonnes X 
                    <span id ="nb_mines_dis">0</span> mines
                </div> 
        <?php
            }
        ?>            

        <div id="label_loose" class="text-center mx-auto text-danger">
            Perdu!!
            <div id="" class="text-center mx-auto">
                <form action="#" method="post" id="form_new_game_loss">
                    <input type="hidden" id="lines_game" name="lines_game" value="<?= $_POST['lines_game']?>">
                    <input type="hidden" id="columns_game" name="columns_game" value="<?= $_POST['columns_game']?>">
                    <input type="hidden" id="mines_game" name="mines_game" value="<?= $_POST['mines_game']?>">
                    <input class="text-success" type="submit" value="Retentez votre chance">
                </form>
            </div>
        </div>

        <div id="label_win" class="text-center mx-auto text-success">
            Gagné!!
            <div id="" class="text-center mx-auto">
                <form action="#" method="post" id="form_new_game_win">
                    <input type="hidden" id="lines_game" name="lines_game" value="<?= $_POST['lines_game']?>">
                    <input type="hidden" id="columns_game" name="columns_game" value="<?= $_POST['columns_game']?>">
                    <input type="hidden" id="mines_game" name="mines_game" value="<?= $_POST['mines_game']?>">
                    <input class="text-success" type="submit" value="Voulez-vous rejouer?">
                </form>
            </div>
        </div>
    </section>

<!-- </div> -->
<!-- <script src="app.js"></script> -->
<script type="text/javascript">
    $(document).ready(function(){
        $("#settings_button").click(function(){
        $("#settings_window").fadeToggle("fast");
    });
        $("#settings_button_mobile").click(function(){
        $("#settings_window").fadeToggle("fast");
    });
});
</script>
<script src="class_app.js"></script>
<script src="app2.js"></script>


</body>
</html>        