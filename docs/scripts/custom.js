function pop_up_position() {
	$('.pop-up').each(function(){
		var hgt = ($(window).height()-$(this).outerHeight())/2;
		var wth = $(this).outerWidth()/2;
		if (hgt<0){
			hgt=$(window).scrollTop();
			if ($(this).outerHeight()>($(document).height()-hgt)) {
				hgt=$(document).height()-$(this).outerHeight();
			};
			$(this).css({'position': 'absolute', 'top': hgt+'px'});
		} else {
			hgt=hgt|0; 
			$(this).css({'position':'fixed', 'top': hgt+'px'});
		};
		$(this).css({'marginLeft': '-'+wth+'px'});
	});
};

$(document).ready(function(){
	
// Styled input file
	$('.styled-input-file').each(function(){
		if ($('input:file', this).val()=='') {
			$('.dashed-link', this).text('��������� ����');
		} else {
			$('.dashed-link', this).text($('input:file', this).val());	
		};
	});
	$('.styled-input-file input:file').on('change', function(){
		$(this).siblings('.file').children('.dashed-link').text($(this).val());
	});
	
// Wrapper items set
	$('.wrapper-item-set').each(function(){
		$('.wrapper-item:odd', this).addClass('odd-child');
	});
	
// Tabs
	$('.tabs-control>li').on('click', function(){
		if ($(this).hasClass('current')){
			return false;
		} else {
			$(this).addClass('current').siblings('li').removeClass('current');
			$('.tabs-content>.tab', $(this).parents('.wrapper-tabs')).removeClass('current').eq($(this).index()).addClass('current');
		};
	});

// Placeholder
    $('input, textarea').placeholder();
    $('input[name="phone"]').inputmask("mask", {"mask": "+7 (999) 999-99-99"});
	
// Styled select
	var i =0;
	$('.styled-select').each(function(){
		$(this).css('z-index', (100-i));
		i++;
	});
	$('select').each(function(){
		$(this).wrap('<div class="styled-select '+ $(this).attr('class') +'"></div>').after('<div class="select"></div><ul></ul>');
		$('option', this).each(function(){
			if ($(this).prop('selected')==true){
				$(this).parents('select').siblings('.select').html($(this).html());
				$(this).parents('select').siblings('ul').append('<li class="active">'+$(this).html()+'</li>');
			} else {
				$(this).parents('select').siblings('ul').append('<li>'+$(this).html()+'</li>');
			};
		});
		if ($(this).parents('.styled-select').hasClass('placeholder')) {
			$(this).siblings('.select').text($(this).attr('rel'));
		};
		$(this).hide().removeAttr('class').parents('.styled-select').css('z-index', (100-i));
		i++;
	});
	$('.styled-select').on('click', function(){
		if ($(this).hasClass('disabled')) {
			return false;
		} else {
			$(this).toggleClass('active');
			var obj = $(this);
			$(document).click(function(event) {
				if ($(event.target).closest(obj).length) return;
				obj.removeClass('active');
				event.stopPropagation();
			});
		};
	});
	$('.styled-select ul li').bind('click', function(){
		var index=$(this).index();
		$(this).addClass('active').siblings('li').removeClass('active');
		$('.select', $(this).parents('.styled-select')).html($(this).text());
		$('select option', $(this).closest('.styled-select')).removeAttr('selected').prop('selected', false);
		$('select option', $(this).closest('.styled-select')).eq(index).prop('selected', true).attr('selected', 'selected');
		$('select', $(this).closest('.styled-select')).val($('option:selected', $(this).parents('.styled-select')).val()).change();
	});

// Validation
    $("#form-pop-order").each(function(){
		$(this).validate({
			rules:{ 
				name:{
					required: true
				},
				phone:{
					required: true
				},
				email:{
					required: true
				}
		   	},
		   	messages:{
				name:{
					required: "������� ���"
				},
				phone:{
					required: "������� �������"
				},
				email:{
					required: "������� e-mail"
				}
		   	}
		});
    });
	$("#form-page-callback").each(function(){
		$(this).validate({
			rules:{ 
				name:{
					required: true
				},
				phone:{
					required: true
				},
				email:{
					required: true
				}
		   	},
		   	messages:{
				name:{
					required: "������� ���"
				},
				phone:{
					required: "������� �������"
				},
				email:{
					required: "������� e-mail"
				}
		   	}
		});
    });
	$("#form-page-pickup").each(function(){
		$(this).validate({
			rules:{ 
				point:{
					required: true
				},
				name:{
					required: true
				},
				phone:{
					required: true
				},
				email:{
					required: true
				}
		   	},
		   	messages:{
				point:{
					required: "�������� ����� ����������"
				},
				name:{
					required: "������� ���"
				},
				phone:{
					required: "������� �������"
				},
				email:{
					required: "������� e-mail"
				}
		   	}
		});
    });
	$("#form-page-feedback").each(function(){
		$(this).validate({
			rules:{
				name:{
					required: true
				},
				phone:{
					required: true
				},
				email:{
					required: true
				}
		   	},
		   	messages:{
				name:{
					required: "������� ���"
				},
				phone:{
					required: "������� �������"
				},
				email:{
					required: "������� e-mail"
				}
		   	}
		});
    });
	
// Map
	$('#map').each(function(){
		ymaps.ready(init);
		var map;
		function init(){     
			map = new ymaps.Map ("map", {
				center: [55.752514,37.972835],
				zoom: 10,
				controls: ['zoomControl']
			});
/*			var office_1 = new ymaps.Placemark([55.790917,37.616087], {
				balloonContentHeader: '�. ������� ����',
				balloonContentBody: '��. ��������� �����, �.15 ���.267<br>���.: (495) 602-65-09'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			*/
			var office_2 = new ymaps.Placemark([55.882970,37.597411], {
				balloonContentHeader: '�. ���������',
				balloonContentBody: '��. �����������, 17�, ���� � 3<br>���.: (495) 665-22-56'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_3 = new ymaps.Placemark([55.752259,37.599393], {
				balloonContentHeader: '�. ���������',
				balloonContentBody: '����� �. 4 ��� 1-1�, ���� 48<br>���.: (495) 644-77-34'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_4 = new ymaps.Placemark([55.800515,37.533725], {
				balloonContentHeader: '�. ��������',
				balloonContentBody: '������������� ��-�, �.62<br>���.: (495) 664-38-81'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_5 = new ymaps.Placemark([55.870351,37.676485], {
				balloonContentHeader: '�. ������������',
				balloonContentBody: '��. ������� ���������, �. 30, �������� 1<br>���.: (495) 798-81-43'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_6 = new ymaps.Placemark([55.778337,37.554042], {
				balloonContentHeader: '�. �������',
				balloonContentBody: '������� ������, �. 7, ������� 2, ��������� 2<br>���.: (495) 585-81-62'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_7 = new ymaps.Placemark([55.840896,37.487386], {
				balloonContentHeader: '�. ������ �������',
				balloonContentBody: '������������� ������� �.7<br>���.: (495) 979-88-73'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			/*var office_8 = new ymaps.Placemark([55.798019,37.572025], {
				balloonContentHeader: '�. �����������',
				balloonContentBody: '��. ��������, �.16, �. 2<br>���.: (916) 993-19-19'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});*/
			
			var office_9 = new ymaps.Placemark([55.652914,37.647316], {
				balloonContentHeader: '�. ���������',
				balloonContentBody: '��������� �����, �.26, ���.3<br>���. 8 (495) 728-45-98<br>(985) 915-46-85<br>(903) 527-39-47'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_10 = new ymaps.Placemark([55.775876,37.660413], {
				balloonContentHeader: '�. �������������',
				balloonContentBody: '������������� �������, �. 6, ��������� "����������"<br>���.: (495) 517-67-23'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_11 = new ymaps.Placemark([55.704450,37.769230], {
				balloonContentHeader: '�. ���������',
				balloonContentBody: '������������� ��������, �.88<br>���.: (495) 988-14-14'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
/*			var office_12 = new ymaps.Placemark([55.709426,37.442227], {
				balloonContentHeader: '�. ����������',
				balloonContentBody: '��. ��������� 29, ����. 134<br>���.: (495) 518-70-71'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			*/
/*			var office_13 = new ymaps.Placemark([55.837042,37.383193], {
				balloonContentHeader: '�. ������',
				balloonContentBody: '������������� ��-�. �.6<br>���.: (926) 235-52-76'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			*/
			var office_14 = new ymaps.Placemark([55.752695,37.818315], {
				balloonContentHeader: '�. �����������',
				balloonContentBody: '��������� ��-�. �.33�<br>���.: (916) 232-80-30<br>(926) 845-61-71<br>(915) 377-06-09'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_15 = new ymaps.Placemark([55.672494,37.551579], {
				balloonContentHeader: '�. ����� ���������',
				balloonContentBody: '��.���������� �21, ���.6 <br>���.: (499) 724-50-02<br>(905) 591-37-34<br>(926) 498-25-53'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			/*var office_16 = new ymaps.Placemark([55.727175,37.609950], {
				balloonContentHeader: '�. �����������',
				balloonContentBody: '��������� �������� ��� 1, ���� 723<br>���.: (962) 900-17-45<br>(495) 959-93-50'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});*/
			
			/*var office_17 = new ymaps.Placemark([55.792651,37.493598], {
				balloonContentHeader: '�. ����������� ����',
				balloonContentBody: '��. ������ ������������ �.8<br>���.: (925) 406-63-96'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});*/
			
			/*var office_18 = new ymaps.Placemark([55.612065,37.603107], {
				balloonContentHeader: '�. ��������',
				balloonContentBody: '��. �������������� �. 24-�<br>���.: (903) 527-39-47'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});*/
			
			var office_19 = new ymaps.Placemark([55.808923,37.462296], {
				balloonContentHeader: '�. ���������',
				balloonContentBody: '��. ������� ������������ 17<br>���.: (495) 585-81-62'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_20 = new ymaps.Placemark([55.739633,37.654154], {
				balloonContentHeader: '�. ���������',
				balloonContentBody: '��. ������� ��������� �.1, 5 ���� ���� 507<br>���.: (495) 506-22-77<br>(495) 988-14-14'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_21 = new ymaps.Placemark([55.708383,37.625476], {
				balloonContentHeader: '�. ��������',
				balloonContentBody: '����������� ��������, �.3<br>���.: (962) 900-17-45<br>(495) 959-93-50'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			/*var office_22 = new ymaps.Placemark([55.774385,37.617458], {
				balloonContentHeader: '�. ������� �������',
				balloonContentBody: '��. �������-���������� 13, �������� 14, ���� 206<br>���.: (495) 545-48-42'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});*/
			
/*			var office_23 = new ymaps.Placemark([55.811042,37.799618], {
				balloonContentHeader: '�. ����������',
				balloonContentBody: '��. ���������, 2�, ���. 1 <br>���.: (499) 748-11-82'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			*/
			var office_24 = new ymaps.Placemark([55.783901,37.709775], {
				balloonContentHeader: '�. ����������������',
				balloonContentBody: '������� ���-�, �.5 ���. 2, ���-�� 110<br>���.: (499) 748-11-82<br>(495) 645-99-00'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_25 = new ymaps.Placemark([55.665281,37.495201], {
				balloonContentHeader: '�. ���-��������',
				balloonContentBody: '��. �����������, �.91 ���.3<br>���.: (495) 518-70-71'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
/*			var office_26 = new ymaps.Placemark([55.622245,37.613164], {
				balloonContentHeader: '�. �����',
				balloonContentBody: '��. ��������������, 9, ����.4, ���. 8<br>���.: (903) 527-39-47'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			*/
			var office_27 = new ymaps.Placemark([55.671752,37.284193], {
				balloonContentHeader: '��������',
				balloonContentBody: '��. �������, 1�, 8 �������, 3 ��., ��. 310<br>���.: (495) 973-5008, (901) 553-5008'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_28 = new ymaps.Placemark([55.817002,37.340193], {
				balloonContentHeader: '�����������',
				balloonContentBody: '��������������� ���., �. 1�<br>���.: (495) 506-22-77'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var office_29 = new ymaps.Placemark([55.886588,37.427157], {
				balloonContentHeader: '�����',
				balloonContentBody: '��. ���������, �. 1<br>���.: (495) 664-37-18'
			},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
/*			var add_1 = new ymaps.Placemark([55.877665,37.508898], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var add_2 = new ymaps.Placemark([55.824771,37.629094], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var add_3 = new ymaps.Placemark([55.807803,37.758247], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var add_4 = new ymaps.Placemark([55.740193,37.434473], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var add_5 = new ymaps.Placemark([55.732893,37.483224], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var add_6 = new ymaps.Placemark([55.692717,37.533864], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var add_7 = new ymaps.Placemark([55.657507,37.709410], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			
			var add_8 = new ymaps.Placemark([55.623386,37.731779], {},
			{ 
				iconLayout: 'default#image',
				iconImageHref: 'images/map-marker.png',
				iconImageSize: [53, 49],
				iconImageOffset: [-27, -10]
			});
			*/
//			map.geoObjects.add(office_1).add(office_2).add(office_3).add(office_4).add(office_5).add(office_6).add(office_7).add(office_9).add(office_10).add(office_11).add(office_12).add(office_13).add(office_14).add(office_15).add(office_19).add(office_20).add(office_21).add(office_23).add(office_24).add(office_25).add(office_26).add(add_1).add(add_2).add(add_3).add(add_4).add(add_5).add(add_7).add(add_8);
			map.geoObjects.add(office_2).add(office_3).add(office_4).add(office_5).add(office_6).add(office_7).add(office_9).add(office_10).add(office_11).add(office_14).add(office_15).add(office_19).add(office_20).add(office_21).add(office_24).add(office_25).add(office_27).add(office_28).add(office_29);
			map.behaviors.disable('scrollZoom');
		}
	});
	
// Pop-up window
	$('.overlay').bind('click touchstart', function() {
		$(this).fadeOut(300).siblings('.pop-up').fadeOut(300);
	});
	$('.js-close').bind('click touchstart', function() {
		$(this).parents('.pop-up').fadeOut(300).siblings('.pop-up').fadeOut(300);
		$('.overlay').fadeOut(300);
	});
	
	pop_up_position();
	$(window).on('resize', function(){
		pop_up_position();
	});
	$('.js-open-order').on('click', function(){
		pop_up_position();
		$('#pop-order').fadeIn(400).siblings('.overlay').fadeIn(400);
	});
	$('.js-open-confidencial').on('click', function(){
		pop_up_position();
		$('#pop-confidencial').fadeIn(400).siblings('.overlay').fadeIn(400);
	});
   
});
