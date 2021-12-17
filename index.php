<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta name="viewport" content="width=device-width">
    <title>demineur made in elsass</title>
    <meta charset="UTF-8">
    <meta name="description" content="test articles en js oop">
    <meta name="keywords" content="demineur alsace 67 bas-rhin mine minesweeper elsass haut-rhin elssas">
    <meta name="author" content="Chelomo ZERBIB">
    <link rel="icon" type="image/x-icon" href="/img/mine_67_68_micro.png">

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
<body class="container-fluid px-0 mx-0 text-center">

<!-- <div id="background_wrapper"> -->
    <img id ="bg_1" src="img/backgroundimage1.jpg" class="img-fluid image_background">
    <img id ="bg_2" src="img/backgroundimage2.jpg" class="img-fluid image_background">
    <img id ="bg_3" src="img/backgroundimage3.jpg" class="img-fluid image_background">
    <img id ="bg_4" src="img/backgroundimage4.jpg" class="img-fluid image_background">
    <img id ="bg_5" src="img/backgroundimage5.jpg" class="img-fluid image_background">
    <!-- <img id ="bg_6" src="img/backgroundimage6.jpg" class="img-fluid image_background"> -->

    <section class=" d-flex justify-content-around container-fluid" id="banniere_haut">

        <div id="settings_button_mobile" >
            <span  id="settings_button_span_mobile"class="material-icons-outlined">menu</span>
        </div>
        
        <h1 class="display-4  text-center text-danger ">
                SweeperStub     
        </h1>

        <div id="settings_button">
            <span id="settings_button_span" class="material-icons-outlined">settings</span>
        </div>


    </section >

    <section class="text-center mt-3" id="section_param" >


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
                        <label for="mines_game"># de mines</label>
                        <input type="number" id="mines_game" name="mines_game" min="1" max="225" 
                        value="<?= isset($_POST['mines_game']) ? $_POST['mines_game'] : 15 ?>">          
                  </div>  
                  <div class="mt-2">
                        <label for="pct_mines_game">% de mines</label>
                        <input  type="number" id="pct_mines_game" name="pct_mines_game" min="1" max="25" value="15">
                  </div>
                </div>

              <input class="mt-3 btn btn-outline-primary" type="submit" value="Démarrer">
            </form>    
        </div>


          
    </section>

    <section class="container-fluid text-center mx-auto " id="game_plan">
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
        <div id="fin_game_plan"></div>

    </section>

<section id="labels_end" class="">
    
    <div id="label_loose" class="text-center mx-auto text-danger mt-4 px-3 pb-3">
        Perdu!!
        <div id="" class="text-center mx-auto mt-2">
            <form action="#" method="post" id="form_new_game_loss" class="container">
                <input type="hidden" id="lines_game" name="lines_game" value="<?= $_POST['lines_game']?>">
                <input type="hidden" id="columns_game" name="columns_game" value="<?= $_POST['columns_game']?>">
                <input type="hidden" id="mines_game" name="mines_game" value="<?= $_POST['mines_game']?>">
                <input class="btn btn-outline-primary text-wrap" type="submit" value="Retentez votre chance">
            </form>
        </div>
    </div>

    <div id="label_win" class="text-center mx-auto text-success mt-4 px-3 pb-3">
        Gagné!!
        <div id="" class="text-center mx-auto mt-2">
            <form action="#" method="post" id="form_new_game_win" class="container">
                <input type="hidden" id="lines_game" name="lines_game" value="<?= $_POST['lines_game']?>">
                <input type="hidden" id="columns_game" name="columns_game" value="<?= $_POST['columns_game']?>">
                <input type="hidden" id="mines_game" name="mines_game" value="<?= $_POST['mines_game']?>">
                <input class="btn btn-outline-primary text-wrap" type="submit" value="Rejouer?">
            </form>
        </div>
    </div>
</section>
<footer class="">
    <div class="text-center m-auto px-2 py-3" id="footer-wrapper">
        
        <div id="footer-text-contact">
            5 rue Stoeber 67000 Strasbourg FRANCE
        </div>
        <div id="footer-text-copyright">
            &copy; Copyright 2021 Shlomo ZERBIB
        </div>
    </div>
 </footer>
<script type="text/javascript">

</script>
<script src="class_app.js"></script>
<script src="app.js"></script>


</body>
</html>        