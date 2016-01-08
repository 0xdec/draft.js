doc = Draft('canvas')

page1 = doc.page('test_page_1')
page1.system('polar')
page1.units('mm')

page1.origin(250, 0)
page1.size(500, 200)

rect1 = page1.rect(100, 120)
circle1 = page1.circle(50)

page2 = doc.page('test_page_2')
page2.size(215.9, 279.4)

page1.prop('name', 'reallyreallyreally_long_name_for_page1_that_just_keeps_going_on_and_on_and_on_and_oh_my_god_its_still_going')