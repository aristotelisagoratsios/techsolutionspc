<?php
/**
* @package RSJuno!
* @copyright (C) 2013 www.rsjoomla.com
* @license GPL, http://www.gnu.org/licenses/gpl-3.0.html
*/
defined('_JEXEC') or die;

define('RSTEMPLATE_PATH', dirname(__FILE__));

// Include helper file
require_once dirname(__FILE__).'/classes/template.php';

// Initialize our template
$template = new RSTemplate($this);

// Load Bootstrap
$template->addBootstrap();
// Load jQuery
$template->addjQuery();
// Load our template's script
$template->addTemplateJs();
// Add stylesheets
$template->addCSS('template.css');
$template->addCSS('social-icon-font.css');
$template->addCSS('theme/'.$this->params->get('templateTheme').'.css');
$template->addComponentCSS();
$template->addModulesCSS();
// Check version and load fixes
$template->addJoomlaCSS();
// Load the custom.css
$template->addCustomCSS();
// Add Javascript Files
$template->addScrollToTop();
$template->setMenuEffect();
// Add Google Font
$template->addGoogleFont();

$innerPadding = '';
$bodyBackground = '';
if ($this->params->get('contentBoxed')) {
	$innerPadding 	= "rstpl-boxed-padding";
	$bodyBackground	= "rstpl-body-background";
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<jdoc:include type="head" />
	<!--[if lt IE 9]>
		<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template;?>/css/ie.css" rel="stylesheet" type="text/css"></script>
		<script src="<?php echo $this->baseurl; ?><?php echo $template->getJSPath('html5', 'html5.js'); ?>"></script>
	<![endif]-->
	<?php 
		// Add Google Analytics Tracking Code
		echo $template->addGoogleAnalytics();
		if (trim($this->params->get('addHeaderContent')) != '') {
			echo $this->params->get('addHeaderContent');
		}
	?>
</head>
<body class="site">
	<div class="body <?php echo $bodyBackground;?> custom_<?php echo $template->getItemId(); ?>">
		<?php if ($this->params->get('contentBoxed')) { ?>
			<div class="rstpl-container-boxed rstpl-boxed">
		<?php } ?>
		<div id="rstpl-before-header"></div>
		<div class="rstpl-normal-inner">
			<div class="container">
				<!-- Header -->
				<header>
					<div class="row-fluid rstpl-header-padding">
						<?php if($this->params->get('logoFluid')) {
							$span = 12;
							
							$activePositions = array();
							if ($this->countModules('top-a')) $activePositions[] = 'top-a';
							if ($this->countModules('top-b')) $activePositions[] = 'top-b';
							if ($this->countModules('top-c')) $activePositions[] = 'top-c';
							if ($this->params->get('logoPosition') != 'none') $activePositions[] = $this->params->get('logoPosition');
							$activePositions = array_unique($activePositions);
							$nrActive = count($activePositions);
							$span = $span / $nrActive;
						}
						else $span = 4;
						?>
						
						<?php if ($this->countModules('top-a or top-b or top-c') || $this->params->get('logoPosition') != 'none') { ?>
							<?php if (!$this->params->get('logoFluid') || (isset($activePositions) && in_array('top-a',$activePositions))) {?>
								<div class="span<?php echo $span;?><?php echo (($this->params->get('logoPosition') != 'top-a' && !$this->countModules('top-a'))?' hidden-phone':'')?> rstpl-small-padding  <?php echo $innerPadding; ?>" id="top-a">
									<?php if ($this->params->get('logoPosition') == 'top-a') $template->widgets['logo']->render();?>
									<jdoc:include type="modules" name="top-a"/>
								</div>
							<?php }?>
							<?php if (!$this->params->get('logoFluid') || (isset($activePositions) && in_array('top-b',$activePositions))) {?>
								<div class="span<?php echo $span;?><?php echo (($this->params->get('logoPosition') != 'top-b' && !$this->countModules('top-b'))?' hidden-phone':'')?> rstpl-small-padding  <?php echo $innerPadding; ?>" id="top-b">
									<?php if ($this->params->get('logoPosition') == 'top-b') $template->widgets['logo']->render();?>
									<jdoc:include type="modules" name="top-b"/>
								</div>
							<?php }?>
							<?php if (!$this->params->get('logoFluid') || (isset($activePositions) && in_array('top-c',$activePositions))) {?>
								<div class="span<?php echo $span;?><?php echo (($this->params->get('logoPosition') != 'top-c' && !$this->countModules('top-c'))?' hidden-phone':'')?> rstpl-small-padding  <?php echo $innerPadding; ?>" id="top-c">
									<?php if ($this->params->get('logoPosition') == 'top-c') $template->widgets['logo']->render();?>
									<jdoc:include type="modules" name="top-c"/>
								</div>
							<?php }?>
						<?php } ?>
					</div>
					<?php if ($this->countModules('main-menu')) { ?>
					<div class="row-fluid">
						<div class="span12" id="main-menu">
							<div class="navbar">
								<div class="navbar-inner">
									<div class="container <?php echo $innerPadding; ?>">
										<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
										  <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
											<span class="icon-bar"></span>
											<span class="icon-bar"></span>
											<span class="icon-bar"></span>
										  </a>
									 
										  <!-- Be sure to leave the brand out there if you want it shown -->
										<a class="brand hidden-desktop" data-toggle="collapse" data-target=".nav-collapse"><?php echo JText::_('TPL_RSJUNO_MENU_BUTTON'); ?></a>
										  <!-- Everything you want hidden at 940px or less, place within here -->
										<div class="nav-collapse collapse">
											<jdoc:include type="modules" name="main-menu"/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<?php } ?>
					<?php if ($this->countModules('slideshow')) { ?>
					<div class="row-fluid rstpl-padding-bottom">
						<div class="span12" id="slideshow">
							<jdoc:include type="modules" name="slideshow"/>
						</div>
					</div>
					<?php } ?>
				</header>
				<!-- end header -->
			</div>
		</div>
		<?php if ($this->countModules('featured-a or featured-b')) { ?>
		<div class="rstpl-prev-content">
			<div class="rstpl-colored-inner">
				<div class="container">
					<div class="row-fluid rstpl-padding">
						<div class="span6 rstpl-featured-before rstpl-small-padding" id="featured-a">
							<jdoc:include type="modules" name="featured-a"/>
						</div>
						<div class="span6 rstpl-featured-before rstpl-small-padding" id="featured-b">
							<jdoc:include type="modules" name="featured-b"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php } ?>
		<div class="container">
			<?php if ($this->countModules('breadcrumbs')) { ?>
				<div class="row-fluid">
					<div class="span12 rstpl-small-padding <?php echo $innerPadding; ?>" id="breadcrumbs"><jdoc:include type="modules" name="breadcrumbs"/></div>
				</div>
			<?php } ?>
			
			<?php 			
			$hasLeftColumn 	= $this->countModules('column-left');
			$hasRightColumn = $this->countModules('column-right');
			$isHomeHidden	= $template->isHomeHidden();
			
			if ($hasLeftColumn && $hasRightColumn) { // 3 columns
				// if the component is set to be hidden on the homepage
				// the left and right columns will span each half width (span6)
				$columnSpan 	= ($isHomeHidden ? 'span6' : 'span3');
				$contentSpan 	= 'span6';
				
				
				$hideAllContent = false;
			} elseif ($hasLeftColumn || $hasRightColumn) { // 2 columns
				// if the component is set to be hidden on the homepage
				// the left or right column will span the whole width (span12)
				$columnSpan 	= ($isHomeHidden ? 'span12' : 'span3');
				$contentSpan 	= 'span9';
				
				
				$hideAllContent = false;
			} else { // 1 column
				$contentSpan 	= 'span12';
				
				
				// if the component is set to be hidden on the homepage
				// hides all content if there are no left or right columns to display
				$hideAllContent = $isHomeHidden;
			}
			?>
			
			<?php
				if (!$hideAllContent) {
			?>
				<div class="row-fluid rstpl-padding">
					<?php if ($hasLeftColumn) { ?>
					<div class="<?php echo $columnSpan; ?> column-left rstpl-small-padding <?php echo $innerPadding; ?>" id="column-left">
						<jdoc:include type="modules" name="column-left" style="rs"/>
					</div>
					<?php } ?>
					<?php if (!$isHomeHidden) { ?>
					<div class="<?php echo $contentSpan; ?> rstpl-small-padding <?php echo $innerPadding; ?>" id="content">
						<jdoc:include type="message" />
						<div id="rstpl-<?php echo $template->getOption(); ?>">
							<jdoc:include type="component" />
						</div>
						<div class="rstpl-small-padding">
							<jdoc:include type="modules" name="inner-after-content" style="rs"/>
						</div>
					</div>
					<?php } ?>
					<?php if ($hasRightColumn) { ?>
					<div class="<?php echo $columnSpan; ?> column-right rstpl-small-padding rstpl-small-padding <?php echo $innerPadding; ?>" id="column-right">
						<jdoc:include type="modules" name="column-right" style="rs"/>
					</div>
					<?php } ?>
				</div>
			<?php } ?>
			<?php if ($this->countModules('after-content')) { ?>
				<div class="row-fluid rstpl-padding">
					<div class="span12 rstpl-black-background rstpl-small-padding" id="after-content">
						<jdoc:include type="modules" name="after-content" style="rstsimple"/>
					</div>
				</div>
			<?php } ?>
			
			
			<?php if ($this->countModules('user-a or user-b or user-c or user-d')) {?>
				<div class="row-fluid">
					<div class="span12 <?php echo $innerPadding; ?>">
						<div class="row-fluid rstpl-padding ">
							<div class="span3 rstpl-small-padding" id="user-a">
								<jdoc:include type="modules" name="user-a" style="rs"/>
							</div>
							<div class="span3 rstpl-small-padding" id="user-b">
								<jdoc:include type="modules" name="user-b" style="rs"/>
							</div>
							<div class="span3 rstpl-small-padding" id="user-c">
								<jdoc:include type="modules" name="user-c" style="rs"/>
							</div>
							<div class="span3 rstpl-small-padding" id="user-d">
								<jdoc:include type="modules" name="user-d" style="rs"/>
							</div>
						</div>
					</div>
				</div>
			<?php } ?>
			
			<?php if ($this->countModules('user-aa or user-bb or user-cc')) { ?>
				<div class="row-fluid">
					<div class="span12 <?php echo $innerPadding; ?>">
						<div class="row-fluid rstpl-padding">
							<div class="span4 rstpl-small-padding" id="user-aa">
								<jdoc:include type="modules" name="user-aa" style="rs"/>
							</div>
							<div class="span4 rstpl-small-padding" id="user-bb">
								<jdoc:include type="modules" name="user-bb" style="rs"/>
							</div>
							<div class="span4 rstpl-small-padding" id="user-cc">
								<jdoc:include type="modules" name="user-cc" style="rs"/>
							</div>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
		<?php		
		if ($this->countModules('featured-bottom-a or featured-bottom-b')) {
			$featuredLeft 	= $this->countModules('featured-bottom-a');
			$featuredRight = $this->countModules('featured-bottom-b');
			
			if ($featuredLeft && $featuredRight) {
				$featuredSpan = 'span6';
			} else {
				$featuredSpan = 'span12';
			}
		?>
			<div class="rstpl-colored-after-content">
				<div class="rstpl-colored-inner">
					<div class="container">
						<div class="row-fluid">
							<div class="span12 <?php echo $innerPadding; ?>">
								<div class="row-fluid">
								<?php if ($featuredLeft) { ?>
									<div class="<?php echo $featuredSpan; ?> rstpl-small-padding" id="featured-bottom-a">
										<jdoc:include type="modules" name="featured-bottom-a" style="rstsimple"/>
									</div>
								<?php } ?>
								<?php if ($featuredRight) { ?>
									<div class="<?php echo $featuredSpan; ?> rstpl-small-padding" id="featured-bottom-b">
										<jdoc:include type="modules" name="featured-bottom-b" style="rstsimple"/>
									</div>
								<?php } ?>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		<?php } ?>
		
		<?php if ($this->countModules('bottom-a or bottom-b or bottom-c') || $this->params->get('socialPosition') != 'none' ) { ?>
			<div class="rstpl-before-footer">
				<div class="container">
					<div class="row-fluid rstpl-padding <?php echo $innerPadding; ?>">
						<div class="span5 rstpl-small-padding rstpl-small-padding" id="bottom-a">
							<?php if ($this->params->get('socialPosition') == 'bottom-a') $template->widgets['social']->render(); ?>
							<jdoc:include type="modules" name="bottom-a" style="rstsimplebottom"/>
						</div>
						<div class="span3 rstpl-small-padding rstpl-small-padding" id="bottom-b">
							<?php if ($this->params->get('socialPosition') == 'bottom-b') $template->widgets['social']->render(); ?>
							<jdoc:include type="modules" name="bottom-b" style="rstsimplebottom"/>
						</div>
						<div class="span4 rstpl-small-padding rstpl-small-padding" id="bottom-c">
							<?php if ($this->params->get('socialPosition') == 'bottom-c') $template->widgets['social']->render(); ?>
							<jdoc:include type="modules" name="bottom-c" style="rstsimplebottom"/>
						</div>
					</div>
				</div>
			</div>
		<?php } ?>
		<div class="footer">
			<div class="container">
				<div class="row-fluid <?php echo $innerPadding; ?>">
					<div class="span5 rstpl-footer-padding rstpl-small-padding" id="footer-a"><jdoc:include type="modules" name="footer-a"/></div>
					<div class="span2 hidden-phone">
						<div id="rstpl-up-arrow"></div>
					</div>
					<div class="span5 rstpl-footer-padding rstpl-small-padding" id="footer-b"><jdoc:include type="modules" name="footer-b"/></div>
				</div>
			</div>
		</div>
		<?php if ($this->params->get('contentBoxed')) { ?>
			</div>
		<?php } ?>
	</div>
	<jdoc:include type="modules" name="debug" style="none" />


<SCRIPT TYPE="text/javascript">

<!--
var msg = "Right click disabled"; //change this message to a message of your own if you want
var showMsg = 0; //change this to 0 if you do not want to show any popup messages when the user right clicks

function internetExplorerRightClick(){ //code to handle right clicks in Internet Explorer
if (document.all){
if (showMsg == 0){
alert(msg);
}
return false;
}
}

function firefoxRightClick(e){ //code to handle right clicks in Firefox and Chrome (as well as other obsolete browsers such as Netscape)
if ((document.layers) || (document.getElementById && !document.all)) {
if (e.which==2 || e.which==3){
if (showMsg == 1){
alert(msg);
}
return false;
}
}
}

if (document.layers){
document.captureEvents(Event.MOUSEDOWN);
document.onmousedown=firefoxRightClick;
}
else{
document.onmouseup=firefoxRightClick;
document.oncontextmenu=internetExplorerRightClick;
}

document.oncontextmenu=new Function("return false");

// -->
</SCRIPT>


  
</body>
</html>