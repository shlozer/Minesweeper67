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
    <link rel="stylesheet" href="style.css">
    
    <!-- <link href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined"> 


</head>
<body class="container-fluid">


    <section class=" d-flex justify-content-around" id="banniere_haut">

        <div id="logo-haut-gauche" class="">
            <img src="img/coiffe-alsacienne-logo.jpg" class="img-fluid">
        </div>
        
        <h1 class="display-4  text-center text-primary">
            Bienvenue sur le démineur alsacien
        </h1>

        <div id="logo-haut-droit" class="">
            <img src="img/coiffe-alsacienne-logo.jpg" class="img-fluid">
        </div>

    </section >

    <section class="text-center mt-3" id="accordion">
        <div class="card">
            <div class="card-header">
                <a id="label_param" class="card-link text-primary text-center" data-toggle="collapse" href="#collapseOne">
                    <span class="material-icons-outlined text-info " id="arrow_downward_1">arrow_downward</span>Entrez vos paramêtres de jeu<span class="material-icons-outlined text-info"  id="arrow_downward_2">arrow_downward</span>
                </a>
            </div>
            <div id="collapseOne" class="collapse
                <?php
                    if ((isset($_POST['lines_game'])) && (isset($_POST['columns_game'])) &&
                        (isset($_POST['mines_game'])))
                        {echo ' hide ';} else {echo ' show ';}
                ?>" data-parent="#accordion">
                <form action="#" method="post" class="text-center mt-3 mb-0 card-body" id="form_param">
                    <div>

                      <label for="lines_game">lignes (entre 5 et 30):</label>
                      <input type="range" id="lines_game" name="lines_game" class="" min="5" max="30" value="10"
                      oninput="this.nextElementSibling.value = this.value">
                      <output class="text-danger" id="output_num1">10</output>

                    </div>
                    <div>
                      <label for="columns_game">colonnes (entre 5 et 30):</label>
                      <input type="range" id="columns_game" name="columns_game" class="" min="5" max="30" value="10"
                      oninput="this.nextElementSibling.value = this.value">
                      <output class="text-danger" id="output_num2">10</output>
                        
                    </div>
                    <div>
                      <label for="mines_game">nombre de mines:</label>
                      <input type="number" id="mines_game" name="mines_game" min="1" max="855" value="15">
                      <label for="pct_mines_game">pourcentage de mines:</label>
                      <input type="number" id="pct_mines_game" name="pct_mines_game" min="1" max="95" value="15">
                        
                    </div>

                  <input class="mt-3" type="submit" value="Démarrer">
                </form>    
            </div>
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
            <div id="new_game_loose" class="text-center mx-auto">
                <button id="btn_new_game">
                    retentez votre chance
                </button>
            </div>
        </div>

        <div id="label_win" class="text-center mx-auto text-danger">
            Gagné!!
            <div id="new_game_win" class="text-center mx-auto">
                <button id="btn_new_game">
                    voulez-vous rejouer?
                </button>
            </div>
        </div>
    </section>


<!-- <script src="app.js"></script> -->
<script src="class_app.js"></script>
<script src="app2.js"></script>


</body>
</html>        