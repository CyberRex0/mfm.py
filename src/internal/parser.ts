import * as M from '..';
import * as P from './core';
import { mergeText } from './util';

const twemojiRegex = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef0-\udef6]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedd-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude74\ude78-\ude7c\ude80-\ude86\ude90-\udeac\udeb0-\udeba\udec0-\udec2\uded0-\uded9\udee0-\udee7]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;

type ArgPair = { k: string, v: string | true };
type Args = Record<string, string | true>;

const space = P.regexp(/[\u0020\u3000\t]/);
const alphaAndNum = P.regexp(/[a-z0-9]/i);
const newLine = P.alt([P.crlf, P.cr, P.lf]);

function seqOrText(parsers: P.Parser<any>[]): P.Parser<any[] | string> {
	return new P.Parser<any[] | string>((input, index, state) => {
		const accum: any[] = [];
		let latestIndex = index;
		for (let i = 0 ; i < parsers.length; i++) {
			const result = parsers[i].handler(input, latestIndex, state);
			if (!result.success) {
				if (latestIndex === index) {
					return P.failure();
				} else {
					return P.success(latestIndex, input.slice(index, latestIndex));
				}
			}
			accum.push(result.value);
			latestIndex = result.index;
		}
		return P.success(latestIndex, accum);
	});
}

const notLinkLabel = new P.Parser((_input, index, state) => {
	return (!state.linkLabel)
		? P.success(index, null)
		: P.failure();
});

const nestable = new P.Parser((_input, index, state) => {
	return (state.depth < state.nestLimit)
		? P.success(index, null)
		: P.failure();
});

function nest<T>(parser: P.Parser<T>, fallback?: P.Parser<string>): P.Parser<T | string> {
	// nesting limited? -> No: specified parser, Yes: fallback parser (default = P.char)
	const inner = P.alt([
		P.seq([nestable, parser], 1),
		(fallback != null) ? fallback : P.char,
	]);
	return new P.Parser<T | string>((input, index, state) => {
		state.depth++;
		const result = inner.handler(input, index, state);
		state.depth--;
		return result;
	});
}

export const language = P.createLanguage({
	fullParser: r => {
		return r.full.many(0);
	},

	simpleParser: r => {
		return r.simple.many(0);
	},

	full: r => {
		return P.alt([
			// Regexp
			r.unicodeEmoji,
			// "<center>" block
			r.centerTag,
			// "<small>"
			r.smallTag,
			// "<plain>"
			r.plainTag,
			// "<b>"
			r.boldTag,
			// "<i>"
			r.italicTag,
			// "<s>"
			r.strikeTag,
			// "<http"
			r.urlAlt,
			// "***"
			r.big,
			// "**"
			r.boldAsta,
			// "*"
			r.italicAsta,
			// "__"
			r.boldUnder,
			// "_"
			r.italicUnder,
			// "```" block
			r.codeBlock,
			// "`"
			r.inlineCode,
			// ">" block
			r.quote,
			// "\\[" block
			r.mathBlock,
			// "\\("
			r.mathInline,
			// "~~"
			r.strikeWave,
			// "$[""
			r.fn,
			// "@"
			r.mention,
			// "#"
			r.hashtag,
			// ":"
			r.emojiCode,
			// "?[" or "["
			r.link,
			// http
			r.url,
			// block
			r.search,
			r.text,
		]);
	},

	simple: r => {
		return P.alt([
			r.unicodeEmoji, // Regexp
			r.emojiCode, // ":"
			r.text,
		]);
	},

	inline: r => {
		return P.alt([
			// Regexp
			r.unicodeEmoji,
			// "<small>"
			r.smallTag,
			// "<plain>"
			r.plainTag,
			// "<b>"
			r.boldTag,
			// "<i>"
			r.italicTag,
			// "<s>"
			r.strikeTag,
			// <http
			r.urlAlt,
			// "***"
			r.big,
			// "**"
			r.boldAsta,
			// "*"
			r.italicAsta,
			// "__"
			r.boldUnder,
			// "_"
			r.italicUnder,
			// "`"
			r.inlineCode,
			// "\\("
			r.mathInline,
			// "~~"
			r.strikeWave,
			// "$[""
			r.fn,
			// "@"
			r.mention,
			// "#"
			r.hashtag,
			// ":"
			r.emojiCode,
			// "?[" or "["
			r.link,
			// http
			r.url,
			r.text,
		]);
	},

	quote: r => {
		const lines: P.Parser<string[]> = P.seq([
			P.str('>'),
			space.option(),
			P.seq([P.notMatch(newLine), P.char], 1).many(0).text(),
		], 2).sep(newLine, 1);
		const parser = P.seq([
			newLine.option(),
			newLine.option(),
			P.lineBegin,
			lines,
			newLine.option(),
			newLine.option(),
		], 3);
		return new P.Parser((input, index, state) => {
			let result;
			// parse quote
			result = parser.handler(input, index, state);
			if (!result.success) {
				return result;
			}
			const contents = result.value;
			const quoteIndex = result.index;
			// disallow empty content if single line
			if (contents.length === 1 && contents[0].length === 0) {
				return P.failure();
			}
			// parse inner content
			const contentParser = nest(r.fullParser).many(0);
			result = contentParser.handler(contents.join('\n'), 0, state);
			if (!result.success) {
				return result;
			}
			return P.success(quoteIndex, M.QUOTE(mergeText(result.value)));
		});
	},

	codeBlock: r => {
		const mark = P.str('```');
		return P.seq([
			newLine.option(),
			P.lineBegin,
			mark,
			P.seq([P.notMatch(newLine), P.char], 1).many(0),
			newLine,
			P.seq([P.notMatch(P.seq([newLine, mark, P.lineEnd])), P.char], 1).many(1),
			newLine,
			mark,
			P.lineEnd,
			newLine.option(),
		]).map(result => {
			const lang = (result[3] as string[]).join('').trim();
			const code = (result[5] as string[]).join('');
			return M.CODE_BLOCK(code, (lang.length > 0 ? lang : null));
		});
	},

	mathBlock: r => {
		const open = P.str('\\[');
		const close = P.str('\\]');
		return P.seq([
			newLine.option(),
			P.lineBegin,
			open,
			newLine.option(),
			P.seq([P.notMatch(P.seq([newLine.option(), close])), P.char], 1).many(1),
			newLine.option(),
			close,
			P.lineEnd,
			newLine.option(),
		]).map(result => {
			const formula = (result[4] as string[]).join('');
			return M.MATH_BLOCK(formula);
		});
	},

	centerTag: r => {
		const open = P.str('<center>');
		const close = P.str('</center>');
		return P.seq([
			newLine.option(),
			P.lineBegin,
			open,
			newLine.option(),
			P.seq([P.notMatch(P.seq([newLine.option(), close])), nest(r.inline)], 1).many(1),
			newLine.option(),
			close,
			P.lineEnd,
			newLine.option(),
		]).map(result => {
			return M.CENTER(mergeText(result[4]));
		});
	},

	big: r => {
		const mark = P.str('***');
		return seqOrText([
			mark,
			P.seq([P.notMatch(mark), nest(r.inline)], 1).many(1),
			mark,
		]).map(result => {
			if (typeof result === 'string') return result;
			return M.FN('tada', {}, mergeText(result[1]));
		});
	},

	boldAsta: r => {
		const mark = P.str('**');
		return seqOrText([
			mark,
			P.seq([P.notMatch(mark), nest(r.inline)], 1).many(1),
			mark,
		]).map(result => {
			if (typeof result === 'string') return result;
			return M.BOLD(mergeText(result[1] as (M.MfmInline | string)[]));
		});
	},

	boldTag: r => {
		const open = P.str('<b>');
		const close = P.str('</b>');
		return seqOrText([
			open,
			P.seq([P.notMatch(close), nest(r.inline)], 1).many(1),
			close,
		]).map(result => {
			if (typeof result === 'string') return result;
			return M.BOLD(mergeText(result[1] as (M.MfmInline | string)[]));
		});
	},

	boldUnder: r => {
		const mark = P.str('__');
		return P.seq([
			mark,
			P.alt([alphaAndNum, space]).many(1),
			mark,
		]).map(result => M.BOLD(mergeText(result[1] as string[])));
	},

	smallTag: r => {
		const open = P.str('<small>');
		const close = P.str('</small>');
		return seqOrText([
			open,
			P.seq([P.notMatch(close), nest(r.inline)], 1).many(1),
			close,
		]).map(result => {
			if (typeof result === 'string') return result;
			return M.SMALL(mergeText(result[1] as (M.MfmInline | string)[]));
		});
	},

	italicTag: r => {
		const open = P.str('<i>');
		const close = P.str('</i>');
		return seqOrText([
			open,
			P.seq([P.notMatch(close), nest(r.inline)], 1).many(1),
			close,
		]).map(result => {
			if (typeof result === 'string') return result;
			return M.ITALIC(mergeText(result[1] as (M.MfmInline | string)[]));
		});
	},

	italicAsta: r => {
		const mark = P.str('*');
		const parser = P.seq([
			mark,
			P.alt([alphaAndNum, space]).many(1),
			mark,
		]);
		return new P.Parser((input, index, state) => {
			const result = parser.handler(input, index, state);
			if (!result.success) {
				return P.failure();
			}
			// check before
			const beforeStr = input.slice(0, index);
			if (/[a-z0-9]$/i.test(beforeStr)) {
				return P.failure();
			}
			return P.success(result.index, M.ITALIC(mergeText(result.value[1] as string[])));
		});
	},

	italicUnder: r => {
		const mark = P.str('_');
		const parser = P.seq([
			mark,
			P.alt([alphaAndNum, space]).many(1),
			mark,
		]);
		return new P.Parser((input, index, state) => {
			const result = parser.handler(input, index, state);
			if (!result.success) {
				return P.failure();
			}
			// check before
			const beforeStr = input.slice(0, index);
			if (/[a-z0-9]$/i.test(beforeStr)) {
				return P.failure();
			}
			return P.success(result.index, M.ITALIC(mergeText(result.value[1] as string[])));
		});
	},

	strikeTag: r => {
		const open = P.str('<s>');
		const close = P.str('</s>');
		return seqOrText([
			open,
			P.seq([P.notMatch(close), nest(r.inline)], 1).many(1),
			close,
		]).map(result => {
			if (typeof result === 'string') return result;
			return M.STRIKE(mergeText(result[1] as (M.MfmInline | string)[]));
		});
	},

	strikeWave: r => {
		const mark = P.str('~~');
		return seqOrText([
			mark,
			P.seq([P.notMatch(P.alt([mark, newLine])), nest(r.inline)], 1).many(1),
			mark,
		]).map(result => {
			if (typeof result === 'string') return result;
			return M.STRIKE(mergeText(result[1] as (M.MfmInline | string)[]));
		});
	},

	unicodeEmoji: r => {
		const emoji = RegExp(twemojiRegex.source);
		return P.regexp(emoji).map(content => M.UNI_EMOJI(content));
	},

	plainTag: r => {
		const open = P.str('<plain>');
		const close = P.str('</plain>');
		return P.seq([
			open,
			newLine.option(),
			P.seq([
				P.notMatch(P.seq([newLine.option(), close])),
				P.char,
			], 1).many(1).text(),
			newLine.option(),
			close,
		], 2).map(result => M.PLAIN(result));
	},

	fn: r => {
		const fnName = new P.Parser((input, index, state) => {
			const result = P.regexp(/[a-z0-9_]+/i).handler(input, index, state);
			if (!result.success) {
				return result;
			}
			return P.success(result.index, result.value);
		});
		const arg: P.Parser<ArgPair> = P.seq([
			P.regexp(/[a-z0-9_]+/i),
			P.seq([
				P.str('='),
				P.regexp(/[a-z0-9_.-]+/i),
			], 1).option(),
		]).map(result => {
			return {
				k: result[0],
				v: (result[1] != null) ? result[1] : true,
			};
		});
		const args = P.seq([
			P.str('.'),
			arg.sep(P.str(','), 1),
		], 1).map(pairs => {
			const result: Args = { };
			for (const pair of pairs) {
				result[pair.k] = pair.v;
			}
			return result;
		});
		const fnClose = P.str(']');
		return seqOrText([
			P.str('$['),
			fnName,
			args.option(),
			P.str(' '),
			P.seq([P.notMatch(fnClose), nest(r.inline)], 1).many(1),
			fnClose,
		]).map(result => {
			if (typeof result === 'string') return result;
			const name = result[1];
			const args = result[2] || {};
			const content = result[4];
			return M.FN(name, args, mergeText(content));
		});
	},

	inlineCode: r => {
		const mark = P.str('`');
		return P.seq([
			mark,
			P.seq([
				P.notMatch(P.alt([mark, P.str('´'), newLine])),
				P.char,
			], 1).many(1),
			mark,
		]).map(result => M.INLINE_CODE(result[1].join('')));
	},

	mathInline: r => {
		const open = P.str('\\(');
		const close = P.str('\\)');
		return P.seq([
			open,
			P.seq([
				P.notMatch(P.alt([close, newLine])),
				P.char,
			], 1).many(1),
			close,
		]).map(result => M.MATH_INLINE(result[1].join('')));
	},

	mention: r => {
		const parser = P.seq([
			notLinkLabel,
			P.str('@'),
			P.regexp(/[a-z0-9_-]+/i),
			P.seq([
				P.str('@'),
				P.regexp(/[a-z0-9_.-]+/i),
			], 1).option(),
		]);
		return new P.Parser<M.MfmMention | string>((input, index, state) => {
			let result;
			result = parser.handler(input, index, state);
			if (!result.success) {
				return P.failure();
			}
			// check before (not mention)
			const beforeStr = input.slice(0, index);
			if (/[a-z0-9]$/i.test(beforeStr)) {
				return P.failure();
			}
			let invalidMention = false;
			const resultIndex = result.index;
			const username: string = result.value[2];
			const hostname: string | null = result.value[3];
			// remove [.-] of tail of hostname
			let modifiedHost = hostname;
			if (hostname != null) {
				result = /[.-]+$/.exec(hostname);
				if (result != null) {
					modifiedHost = hostname.slice(0, (-1 * result[0].length));
					if (modifiedHost.length === 0) {
						// disallow invalid char only hostname
						invalidMention = true;
						modifiedHost = null;
					}
				}
			}
			// remove "-" of tail of username
			let modifiedName = username;
			result = /-+$/.exec(username);
			if (result != null) {
				if (modifiedHost == null) {
					modifiedName = username.slice(0, (-1 * result[0].length));
				} else {
					// cannnot to remove tail of username if exist hostname
					invalidMention = true;
				}
			}
			// disallow "-" of head of username
			if (modifiedName.length === 0 || modifiedName[0] === '-') {
				invalidMention = true;
			}
			// disallow [.-] of head of hostname
			if (modifiedHost != null && /^[.-]/.test(modifiedHost)) {
				invalidMention = true;
			}
			// generate a text if mention is invalid
			if (invalidMention) {
				return P.success(resultIndex, input.slice(index, resultIndex));
			}
			const acct = modifiedHost != null ? `@${modifiedName}@${modifiedHost}` : `@${modifiedName}`;
			return P.success(index + acct.length, M.MENTION(modifiedName, modifiedHost, acct));
		});
	},

	hashtag: r => {
		const mark = P.str('#');
		const hashTagChar = P.seq([
			P.notMatch(P.alt([P.regexp(/[ \u3000\t.,!?'"#:/[\]【】()「」（）<>]/), space, newLine])),
			P.char,
		], 1);
		const innerItem: P.Parser<any> = P.lazy(() => P.alt([
			P.seq([
				P.str('('), nest(innerItem, hashTagChar).many(0), P.str(')'),
			]),
			P.seq([
				P.str('['), nest(innerItem, hashTagChar).many(0), P.str(']'),
			]),
			P.seq([
				P.str('「'), nest(innerItem, hashTagChar).many(0), P.str('」'),
			]),
			P.seq([
				P.str('（'), nest(innerItem, hashTagChar).many(0), P.str('）'),
			]),
			hashTagChar,
		]));
		const parser = P.seq([
			notLinkLabel,
			mark,
			innerItem.many(1).text(),
		], 2);
		return new P.Parser((input, index, state) => {
			const result = parser.handler(input, index, state);
			if (!result.success) {
				return P.failure();
			}
			// check before
			const beforeStr = input.slice(0, index);
			if (/[a-z0-9]$/i.test(beforeStr)) {
				return P.failure();
			}
			const resultIndex = result.index;
			const resultValue = result.value;
			// disallow number only
			if (/^[0-9]+$/.test(resultValue)) {
				return P.failure();
			}
			return P.success(resultIndex, M.HASHTAG(resultValue));
		});
	},

	emojiCode: r => {
		const side = P.notMatch(P.regexp(/[a-z0-9]/i));
		const mark = P.str(':');
		return P.seq([
			P.alt([P.lineBegin, side]),
			mark,
			P.regexp(/[a-z0-9_+-]+/i),
			mark,
			P.alt([P.lineEnd, side]),
		], 2).map(name => M.EMOJI_CODE(name as string));
	},

	link: r => {
		const labelInline = new P.Parser((input, index, state) => {
			state.linkLabel = true;
			const result = r.inline.handler(input, index, state);
			state.linkLabel = false;
			return result;
		});
		const closeLabel = P.str(']');
		return P.seq([
			notLinkLabel,
			P.alt([P.str('?['), P.str('[')]),
			P.seq([
				P.notMatch(P.alt([closeLabel, newLine])),
				nest(labelInline),
			], 1).many(1),
			closeLabel,
			P.str('('),
			P.alt([r.urlAlt, r.url]),
			P.str(')'),
		]).map(result => {
			const silent = (result[1] === '?[');
			const label = result[2];
			const url: M.MfmUrl = result[5];
			return M.LINK(silent, url.props.url, mergeText(label));
		});
	},

	url: r => {
		const urlChar = P.regexp(/[.,a-z0-9_/:%#@$&?!~=+-]/i);
		const innerItem: P.Parser<any> = P.lazy(() => P.alt([
			P.seq([
				P.str('('), nest(innerItem, urlChar).many(0), P.str(')'),
			]),
			P.seq([
				P.str('['), nest(innerItem, urlChar).many(0), P.str(']'),
			]),
			urlChar,
		]));
		const parser = P.seq([
			notLinkLabel,
			P.regexp(/https?:\/\//),
			innerItem.many(1).text(),
		]);
		return new P.Parser<M.MfmUrl | string>((input, index, state) => {
			let result;
			result = parser.handler(input, index, state);
			if (!result.success) {
				return P.failure();
			}
			const resultIndex = result.index;
			let modifiedIndex = resultIndex;
			const schema: string = result.value[1];
			let content: string = result.value[2];
			// remove the ".," at the right end
			result = /[.,]+$/.exec(content);
			if (result != null) {
				modifiedIndex -= result[0].length;
				content = content.slice(0, (-1 * result[0].length));
				if (content.length === 0) {
					return P.success(resultIndex, input.slice(index, resultIndex));
				}
			}
			return P.success(modifiedIndex, M.N_URL(schema + content, false));
		});
	},

	urlAlt: r => {
		const open = P.str('<');
		const close = P.str('>');
		const parser = P.seq([
			notLinkLabel,
			open,
			P.regexp(/https?:\/\//),
			P.seq([P.notMatch(P.alt([close, space])), P.char], 1).many(1),
			close,
		]).text();
		return new P.Parser((input, index, state) => {
			const result = parser.handler(input, index, state);
			if (!result.success) {
				return P.failure();
			}
			const text = result.value.slice(1, (result.value.length - 1));
			return P.success(result.index, M.N_URL(text, true));
		});
	},

	search: r => {
		const button = P.alt([
			P.regexp(/\[(検索|search)\]/i),
			P.regexp(/(検索|search)/i),
		]);
		return P.seq([
			newLine.option(),
			P.lineBegin,
			P.seq([
				P.notMatch(P.alt([
					newLine,
					P.seq([space, button, P.lineEnd]),
				])),
				P.char,
			], 1).many(1),
			space,
			button,
			P.lineEnd,
			newLine.option(),
		]).map(result => {
			const query = result[2].join('');
			return M.SEARCH(query, `${query}${result[3]}${result[4]}`);
		});
	},

	text: r => P.char,
});
