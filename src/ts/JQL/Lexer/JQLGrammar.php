<?php
/* Jison generated parser */
namespace Jison;
use Exception;




class JQLGrammar
{
    public $symbols = array();
    public $terminals = array();
    public $productions = array();
    public $table = array();
    public $defaultActions = array();
    public $version = '0.3.12';
    public $debug = false;
    public $none = 0;
    public $shift = 1;
    public $reduce = 2;
    public $accept = 3;

    function trace()
    {

    }

    function __construct()
    {
        //Setup Parser
        
			$symbol0 = new ParserSymbol("accept", 0);
			$symbol1 = new ParserSymbol("end", 1);
			$symbol2 = new ParserSymbol("error", 2);
			$symbol3 = new ParserSymbol("JQL", 3);
			$symbol4 = new ParserSymbol("REMOTE", 4);
			$symbol5 = new ParserSymbol("Statement", 5);
			$symbol6 = new ParserSymbol("EOF", 6);
			$symbol7 = new ParserSymbol("SelectStatement", 7);
			$symbol8 = new ParserSymbol("UpdateStatement", 8);
			$symbol9 = new ParserSymbol("InsertStatement", 9);
			$symbol10 = new ParserSymbol("DeleteStatement", 10);
			$symbol11 = new ParserSymbol("SelectSingleRowStatement", 11);
			$symbol12 = new ParserSymbol("SELECT", 12);
			$symbol13 = new ParserSymbol("SelectFieldsList", 13);
			$symbol14 = new ParserSymbol("SelectFromTableStatement", 14);
			$symbol15 = new ParserSymbol("FROM", 15);
			$symbol16 = new ParserSymbol("TableReference", 16);
			$symbol17 = new ParserSymbol("SelectWithOptionalWHEREClause", 17);
			$symbol18 = new ParserSymbol("WHERE", 18);
			$symbol19 = new ParserSymbol("Expression", 19);
			$symbol20 = new ParserSymbol("SelectWithOptionalORDERClause", 20);
			$symbol21 = new ParserSymbol("ORDER", 21);
			$symbol22 = new ParserSymbol("BY", 22);
			$symbol23 = new ParserSymbol("OrderByClause", 23);
			$symbol24 = new ParserSymbol("SelectWithOptionalLIMITClause", 24);
			$symbol25 = new ParserSymbol("LIMIT", 25);
			$symbol26 = new ParserSymbol("LimitClause", 26);
			$symbol27 = new ParserSymbol("SelectStatementWithoutUnion", 27);
			$symbol28 = new ParserSymbol("UNION", 28);
			$symbol29 = new ParserSymbol("UpdateStatementBegin", 29);
			$symbol30 = new ParserSymbol("UPDATE", 30);
			$symbol31 = new ParserSymbol("DelayedClause", 31);
			$symbol32 = new ParserSymbol("DELAYED", 32);
			$symbol33 = new ParserSymbol("NUMBER", 33);
			$symbol34 = new ParserSymbol("UpdateAllRowsStatement", 34);
			$symbol35 = new ParserSymbol("SET", 35);
			$symbol36 = new ParserSymbol("UpdateFieldsList", 36);
			$symbol37 = new ParserSymbol("UpdateWithOptionalWHEREStatement", 37);
			$symbol38 = new ParserSymbol("UpdateWithOptionalORDERStatement", 38);
			$symbol39 = new ParserSymbol("UpdateWithOptionalLIMITStatement", 39);
			$symbol40 = new ParserSymbol("InsertStatementBegin", 40);
			$symbol41 = new ParserSymbol("INSERT", 41);
			$symbol42 = new ParserSymbol("IGNORE", 42);
			$symbol43 = new ParserSymbol("INTO", 43);
			$symbol44 = new ParserSymbol("DeleteAllRowsStatement", 44);
			$symbol45 = new ParserSymbol("DELETE", 45);
			$symbol46 = new ParserSymbol("DeleteWithOptionalWHEREClauseStatement", 46);
			$symbol47 = new ParserSymbol("DeleteWithOptionalORDERClauseStatement", 47);
			$symbol48 = new ParserSymbol("DeleteWithOptionalLIMITClauseStatement", 48);
			$symbol49 = new ParserSymbol("IDENTIFIER", 49);
			$symbol50 = new ParserSymbol("ESCAPED_IDENTIFIER", 50);
			$symbol51 = new ParserSymbol("*", 51);
			$symbol52 = new ParserSymbol("SelectFieldEnumeration", 52);
			$symbol53 = new ParserSymbol("SelectField", 53);
			$symbol54 = new ParserSymbol(",", 54);
			$symbol55 = new ParserSymbol("AS", 55);
			$symbol56 = new ParserSymbol("UpdateField", 56);
			$symbol57 = new ParserSymbol("=", 57);
			$symbol58 = new ParserSymbol("BOOLEAN", 58);
			$symbol59 = new ParserSymbol("NULL", 59);
			$symbol60 = new ParserSymbol("STRING", 60);
			$symbol61 = new ParserSymbol("!", 61);
			$symbol62 = new ParserSymbol("-", 62);
			$symbol63 = new ParserSymbol("||", 63);
			$symbol64 = new ParserSymbol("&&", 64);
			$symbol65 = new ParserSymbol("==", 65);
			$symbol66 = new ParserSymbol("~=", 66);
			$symbol67 = new ParserSymbol("<=", 67);
			$symbol68 = new ParserSymbol("<", 68);
			$symbol69 = new ParserSymbol(">=", 69);
			$symbol70 = new ParserSymbol(">", 70);
			$symbol71 = new ParserSymbol("/", 71);
			$symbol72 = new ParserSymbol("+", 72);
			$symbol73 = new ParserSymbol("FunctionCall", 73);
			$symbol74 = new ParserSymbol("(", 74);
			$symbol75 = new ParserSymbol(")", 75);
			$symbol76 = new ParserSymbol("BINDING", 76);
			$symbol77 = new ParserSymbol("FunctionCallArgumentsList", 77);
			$symbol78 = new ParserSymbol("RANDOM", 78);
			$symbol79 = new ParserSymbol("OrderByClauseFieldsList", 79);
			$symbol80 = new ParserSymbol("OrderByField", 80);
			$symbol81 = new ParserSymbol("ASC", 81);
			$symbol82 = new ParserSymbol("DESC", 82);
			$this->symbols[0] = $symbol0;
			$this->symbols["accept"] = $symbol0;
			$this->symbols[1] = $symbol1;
			$this->symbols["end"] = $symbol1;
			$this->symbols[2] = $symbol2;
			$this->symbols["error"] = $symbol2;
			$this->symbols[3] = $symbol3;
			$this->symbols["JQL"] = $symbol3;
			$this->symbols[4] = $symbol4;
			$this->symbols["REMOTE"] = $symbol4;
			$this->symbols[5] = $symbol5;
			$this->symbols["Statement"] = $symbol5;
			$this->symbols[6] = $symbol6;
			$this->symbols["EOF"] = $symbol6;
			$this->symbols[7] = $symbol7;
			$this->symbols["SelectStatement"] = $symbol7;
			$this->symbols[8] = $symbol8;
			$this->symbols["UpdateStatement"] = $symbol8;
			$this->symbols[9] = $symbol9;
			$this->symbols["InsertStatement"] = $symbol9;
			$this->symbols[10] = $symbol10;
			$this->symbols["DeleteStatement"] = $symbol10;
			$this->symbols[11] = $symbol11;
			$this->symbols["SelectSingleRowStatement"] = $symbol11;
			$this->symbols[12] = $symbol12;
			$this->symbols["SELECT"] = $symbol12;
			$this->symbols[13] = $symbol13;
			$this->symbols["SelectFieldsList"] = $symbol13;
			$this->symbols[14] = $symbol14;
			$this->symbols["SelectFromTableStatement"] = $symbol14;
			$this->symbols[15] = $symbol15;
			$this->symbols["FROM"] = $symbol15;
			$this->symbols[16] = $symbol16;
			$this->symbols["TableReference"] = $symbol16;
			$this->symbols[17] = $symbol17;
			$this->symbols["SelectWithOptionalWHEREClause"] = $symbol17;
			$this->symbols[18] = $symbol18;
			$this->symbols["WHERE"] = $symbol18;
			$this->symbols[19] = $symbol19;
			$this->symbols["Expression"] = $symbol19;
			$this->symbols[20] = $symbol20;
			$this->symbols["SelectWithOptionalORDERClause"] = $symbol20;
			$this->symbols[21] = $symbol21;
			$this->symbols["ORDER"] = $symbol21;
			$this->symbols[22] = $symbol22;
			$this->symbols["BY"] = $symbol22;
			$this->symbols[23] = $symbol23;
			$this->symbols["OrderByClause"] = $symbol23;
			$this->symbols[24] = $symbol24;
			$this->symbols["SelectWithOptionalLIMITClause"] = $symbol24;
			$this->symbols[25] = $symbol25;
			$this->symbols["LIMIT"] = $symbol25;
			$this->symbols[26] = $symbol26;
			$this->symbols["LimitClause"] = $symbol26;
			$this->symbols[27] = $symbol27;
			$this->symbols["SelectStatementWithoutUnion"] = $symbol27;
			$this->symbols[28] = $symbol28;
			$this->symbols["UNION"] = $symbol28;
			$this->symbols[29] = $symbol29;
			$this->symbols["UpdateStatementBegin"] = $symbol29;
			$this->symbols[30] = $symbol30;
			$this->symbols["UPDATE"] = $symbol30;
			$this->symbols[31] = $symbol31;
			$this->symbols["DelayedClause"] = $symbol31;
			$this->symbols[32] = $symbol32;
			$this->symbols["DELAYED"] = $symbol32;
			$this->symbols[33] = $symbol33;
			$this->symbols["NUMBER"] = $symbol33;
			$this->symbols[34] = $symbol34;
			$this->symbols["UpdateAllRowsStatement"] = $symbol34;
			$this->symbols[35] = $symbol35;
			$this->symbols["SET"] = $symbol35;
			$this->symbols[36] = $symbol36;
			$this->symbols["UpdateFieldsList"] = $symbol36;
			$this->symbols[37] = $symbol37;
			$this->symbols["UpdateWithOptionalWHEREStatement"] = $symbol37;
			$this->symbols[38] = $symbol38;
			$this->symbols["UpdateWithOptionalORDERStatement"] = $symbol38;
			$this->symbols[39] = $symbol39;
			$this->symbols["UpdateWithOptionalLIMITStatement"] = $symbol39;
			$this->symbols[40] = $symbol40;
			$this->symbols["InsertStatementBegin"] = $symbol40;
			$this->symbols[41] = $symbol41;
			$this->symbols["INSERT"] = $symbol41;
			$this->symbols[42] = $symbol42;
			$this->symbols["IGNORE"] = $symbol42;
			$this->symbols[43] = $symbol43;
			$this->symbols["INTO"] = $symbol43;
			$this->symbols[44] = $symbol44;
			$this->symbols["DeleteAllRowsStatement"] = $symbol44;
			$this->symbols[45] = $symbol45;
			$this->symbols["DELETE"] = $symbol45;
			$this->symbols[46] = $symbol46;
			$this->symbols["DeleteWithOptionalWHEREClauseStatement"] = $symbol46;
			$this->symbols[47] = $symbol47;
			$this->symbols["DeleteWithOptionalORDERClauseStatement"] = $symbol47;
			$this->symbols[48] = $symbol48;
			$this->symbols["DeleteWithOptionalLIMITClauseStatement"] = $symbol48;
			$this->symbols[49] = $symbol49;
			$this->symbols["IDENTIFIER"] = $symbol49;
			$this->symbols[50] = $symbol50;
			$this->symbols["ESCAPED_IDENTIFIER"] = $symbol50;
			$this->symbols[51] = $symbol51;
			$this->symbols["*"] = $symbol51;
			$this->symbols[52] = $symbol52;
			$this->symbols["SelectFieldEnumeration"] = $symbol52;
			$this->symbols[53] = $symbol53;
			$this->symbols["SelectField"] = $symbol53;
			$this->symbols[54] = $symbol54;
			$this->symbols[","] = $symbol54;
			$this->symbols[55] = $symbol55;
			$this->symbols["AS"] = $symbol55;
			$this->symbols[56] = $symbol56;
			$this->symbols["UpdateField"] = $symbol56;
			$this->symbols[57] = $symbol57;
			$this->symbols["="] = $symbol57;
			$this->symbols[58] = $symbol58;
			$this->symbols["BOOLEAN"] = $symbol58;
			$this->symbols[59] = $symbol59;
			$this->symbols["NULL"] = $symbol59;
			$this->symbols[60] = $symbol60;
			$this->symbols["STRING"] = $symbol60;
			$this->symbols[61] = $symbol61;
			$this->symbols["!"] = $symbol61;
			$this->symbols[62] = $symbol62;
			$this->symbols["-"] = $symbol62;
			$this->symbols[63] = $symbol63;
			$this->symbols["||"] = $symbol63;
			$this->symbols[64] = $symbol64;
			$this->symbols["&&"] = $symbol64;
			$this->symbols[65] = $symbol65;
			$this->symbols["=="] = $symbol65;
			$this->symbols[66] = $symbol66;
			$this->symbols["~="] = $symbol66;
			$this->symbols[67] = $symbol67;
			$this->symbols["<="] = $symbol67;
			$this->symbols[68] = $symbol68;
			$this->symbols["<"] = $symbol68;
			$this->symbols[69] = $symbol69;
			$this->symbols[">="] = $symbol69;
			$this->symbols[70] = $symbol70;
			$this->symbols[">"] = $symbol70;
			$this->symbols[71] = $symbol71;
			$this->symbols["/"] = $symbol71;
			$this->symbols[72] = $symbol72;
			$this->symbols["+"] = $symbol72;
			$this->symbols[73] = $symbol73;
			$this->symbols["FunctionCall"] = $symbol73;
			$this->symbols[74] = $symbol74;
			$this->symbols["("] = $symbol74;
			$this->symbols[75] = $symbol75;
			$this->symbols[")"] = $symbol75;
			$this->symbols[76] = $symbol76;
			$this->symbols["BINDING"] = $symbol76;
			$this->symbols[77] = $symbol77;
			$this->symbols["FunctionCallArgumentsList"] = $symbol77;
			$this->symbols[78] = $symbol78;
			$this->symbols["RANDOM"] = $symbol78;
			$this->symbols[79] = $symbol79;
			$this->symbols["OrderByClauseFieldsList"] = $symbol79;
			$this->symbols[80] = $symbol80;
			$this->symbols["OrderByField"] = $symbol80;
			$this->symbols[81] = $symbol81;
			$this->symbols["ASC"] = $symbol81;
			$this->symbols[82] = $symbol82;
			$this->symbols["DESC"] = $symbol82;

			$this->terminals = array(
					2=>&$symbol2,
					4=>&$symbol4,
					6=>&$symbol6,
					12=>&$symbol12,
					15=>&$symbol15,
					18=>&$symbol18,
					21=>&$symbol21,
					22=>&$symbol22,
					25=>&$symbol25,
					28=>&$symbol28,
					30=>&$symbol30,
					32=>&$symbol32,
					33=>&$symbol33,
					35=>&$symbol35,
					41=>&$symbol41,
					42=>&$symbol42,
					43=>&$symbol43,
					45=>&$symbol45,
					49=>&$symbol49,
					50=>&$symbol50,
					51=>&$symbol51,
					54=>&$symbol54,
					55=>&$symbol55,
					57=>&$symbol57,
					58=>&$symbol58,
					59=>&$symbol59,
					60=>&$symbol60,
					61=>&$symbol61,
					62=>&$symbol62,
					63=>&$symbol63,
					64=>&$symbol64,
					65=>&$symbol65,
					66=>&$symbol66,
					67=>&$symbol67,
					68=>&$symbol68,
					69=>&$symbol69,
					70=>&$symbol70,
					71=>&$symbol71,
					72=>&$symbol72,
					74=>&$symbol74,
					75=>&$symbol75,
					76=>&$symbol76,
					78=>&$symbol78,
					81=>&$symbol81,
					82=>&$symbol82
				);

			$table0 = new ParserState(0);
			$table1 = new ParserState(1);
			$table2 = new ParserState(2);
			$table3 = new ParserState(3);
			$table4 = new ParserState(4);
			$table5 = new ParserState(5);
			$table6 = new ParserState(6);
			$table7 = new ParserState(7);
			$table8 = new ParserState(8);
			$table9 = new ParserState(9);
			$table10 = new ParserState(10);
			$table11 = new ParserState(11);
			$table12 = new ParserState(12);
			$table13 = new ParserState(13);
			$table14 = new ParserState(14);
			$table15 = new ParserState(15);
			$table16 = new ParserState(16);
			$table17 = new ParserState(17);
			$table18 = new ParserState(18);
			$table19 = new ParserState(19);
			$table20 = new ParserState(20);
			$table21 = new ParserState(21);
			$table22 = new ParserState(22);
			$table23 = new ParserState(23);
			$table24 = new ParserState(24);
			$table25 = new ParserState(25);
			$table26 = new ParserState(26);
			$table27 = new ParserState(27);
			$table28 = new ParserState(28);
			$table29 = new ParserState(29);
			$table30 = new ParserState(30);
			$table31 = new ParserState(31);
			$table32 = new ParserState(32);
			$table33 = new ParserState(33);
			$table34 = new ParserState(34);
			$table35 = new ParserState(35);
			$table36 = new ParserState(36);
			$table37 = new ParserState(37);
			$table38 = new ParserState(38);
			$table39 = new ParserState(39);
			$table40 = new ParserState(40);
			$table41 = new ParserState(41);
			$table42 = new ParserState(42);
			$table43 = new ParserState(43);
			$table44 = new ParserState(44);
			$table45 = new ParserState(45);
			$table46 = new ParserState(46);
			$table47 = new ParserState(47);
			$table48 = new ParserState(48);
			$table49 = new ParserState(49);
			$table50 = new ParserState(50);
			$table51 = new ParserState(51);
			$table52 = new ParserState(52);
			$table53 = new ParserState(53);
			$table54 = new ParserState(54);
			$table55 = new ParserState(55);
			$table56 = new ParserState(56);
			$table57 = new ParserState(57);
			$table58 = new ParserState(58);
			$table59 = new ParserState(59);
			$table60 = new ParserState(60);
			$table61 = new ParserState(61);
			$table62 = new ParserState(62);
			$table63 = new ParserState(63);
			$table64 = new ParserState(64);
			$table65 = new ParserState(65);
			$table66 = new ParserState(66);
			$table67 = new ParserState(67);
			$table68 = new ParserState(68);
			$table69 = new ParserState(69);
			$table70 = new ParserState(70);
			$table71 = new ParserState(71);
			$table72 = new ParserState(72);
			$table73 = new ParserState(73);
			$table74 = new ParserState(74);
			$table75 = new ParserState(75);
			$table76 = new ParserState(76);
			$table77 = new ParserState(77);
			$table78 = new ParserState(78);
			$table79 = new ParserState(79);
			$table80 = new ParserState(80);
			$table81 = new ParserState(81);
			$table82 = new ParserState(82);
			$table83 = new ParserState(83);
			$table84 = new ParserState(84);
			$table85 = new ParserState(85);
			$table86 = new ParserState(86);
			$table87 = new ParserState(87);
			$table88 = new ParserState(88);
			$table89 = new ParserState(89);
			$table90 = new ParserState(90);
			$table91 = new ParserState(91);
			$table92 = new ParserState(92);
			$table93 = new ParserState(93);
			$table94 = new ParserState(94);
			$table95 = new ParserState(95);
			$table96 = new ParserState(96);
			$table97 = new ParserState(97);
			$table98 = new ParserState(98);
			$table99 = new ParserState(99);
			$table100 = new ParserState(100);
			$table101 = new ParserState(101);
			$table102 = new ParserState(102);
			$table103 = new ParserState(103);
			$table104 = new ParserState(104);
			$table105 = new ParserState(105);
			$table106 = new ParserState(106);
			$table107 = new ParserState(107);
			$table108 = new ParserState(108);
			$table109 = new ParserState(109);
			$table110 = new ParserState(110);
			$table111 = new ParserState(111);
			$table112 = new ParserState(112);
			$table113 = new ParserState(113);
			$table114 = new ParserState(114);
			$table115 = new ParserState(115);
			$table116 = new ParserState(116);
			$table117 = new ParserState(117);
			$table118 = new ParserState(118);
			$table119 = new ParserState(119);
			$table120 = new ParserState(120);
			$table121 = new ParserState(121);
			$table122 = new ParserState(122);
			$table123 = new ParserState(123);
			$table124 = new ParserState(124);
			$table125 = new ParserState(125);
			$table126 = new ParserState(126);
			$table127 = new ParserState(127);
			$table128 = new ParserState(128);
			$table129 = new ParserState(129);
			$table130 = new ParserState(130);
			$table131 = new ParserState(131);
			$table132 = new ParserState(132);
			$table133 = new ParserState(133);
			$table134 = new ParserState(134);
			$table135 = new ParserState(135);
			$table136 = new ParserState(136);
			$table137 = new ParserState(137);
			$table138 = new ParserState(138);
			$table139 = new ParserState(139);
			$table140 = new ParserState(140);
			$table141 = new ParserState(141);
			$table142 = new ParserState(142);
			$table143 = new ParserState(143);
			$table144 = new ParserState(144);
			$table145 = new ParserState(145);
			$table146 = new ParserState(146);
			$table147 = new ParserState(147);
			$table148 = new ParserState(148);

			$tableDefinition0 = array(
				
					3=>new ParserAction($this->none, $table1),
					4=>new ParserAction($this->shift, $table2),
					5=>new ParserAction($this->none, $table3),
					7=>new ParserAction($this->none, $table4),
					8=>new ParserAction($this->none, $table5),
					9=>new ParserAction($this->none, $table6),
					10=>new ParserAction($this->none, $table7),
					11=>new ParserAction($this->none, $table13),
					12=>new ParserAction($this->shift, $table18),
					14=>new ParserAction($this->none, $table24),
					17=>new ParserAction($this->none, $table21),
					20=>new ParserAction($this->none, $table17),
					24=>new ParserAction($this->none, $table12),
					27=>new ParserAction($this->none, $table8),
					29=>new ParserAction($this->none, $table25),
					30=>new ParserAction($this->shift, $table27),
					34=>new ParserAction($this->none, $table22),
					37=>new ParserAction($this->none, $table19),
					38=>new ParserAction($this->none, $table14),
					39=>new ParserAction($this->none, $table9),
					40=>new ParserAction($this->none, $table10),
					41=>new ParserAction($this->shift, $table15),
					44=>new ParserAction($this->none, $table23),
					45=>new ParserAction($this->shift, $table26),
					46=>new ParserAction($this->none, $table20),
					47=>new ParserAction($this->none, $table16),
					48=>new ParserAction($this->none, $table11)
				);

			$tableDefinition1 = array(
				
					1=>new ParserAction($this->accept)
				);

			$tableDefinition2 = array(
				
					5=>new ParserAction($this->none, $table28),
					7=>new ParserAction($this->none, $table4),
					8=>new ParserAction($this->none, $table5),
					9=>new ParserAction($this->none, $table6),
					10=>new ParserAction($this->none, $table7),
					11=>new ParserAction($this->none, $table13),
					12=>new ParserAction($this->shift, $table18),
					14=>new ParserAction($this->none, $table24),
					17=>new ParserAction($this->none, $table21),
					20=>new ParserAction($this->none, $table17),
					24=>new ParserAction($this->none, $table12),
					27=>new ParserAction($this->none, $table8),
					29=>new ParserAction($this->none, $table25),
					30=>new ParserAction($this->shift, $table27),
					34=>new ParserAction($this->none, $table22),
					37=>new ParserAction($this->none, $table19),
					38=>new ParserAction($this->none, $table14),
					39=>new ParserAction($this->none, $table9),
					40=>new ParserAction($this->none, $table10),
					41=>new ParserAction($this->shift, $table15),
					44=>new ParserAction($this->none, $table23),
					45=>new ParserAction($this->shift, $table26),
					46=>new ParserAction($this->none, $table20),
					47=>new ParserAction($this->none, $table16),
					48=>new ParserAction($this->none, $table11)
				);

			$tableDefinition3 = array(
				
					6=>new ParserAction($this->shift, $table29)
				);

			$tableDefinition4 = array(
				
					6=>new ParserAction($this->reduce, $table3),
					28=>new ParserAction($this->shift, $table30)
				);

			$tableDefinition5 = array(
				
					6=>new ParserAction($this->reduce, $table4)
				);

			$tableDefinition6 = array(
				
					6=>new ParserAction($this->reduce, $table5)
				);

			$tableDefinition7 = array(
				
					6=>new ParserAction($this->reduce, $table6)
				);

			$tableDefinition8 = array(
				
					6=>new ParserAction($this->reduce, $table17),
					28=>new ParserAction($this->reduce, $table17)
				);

			$tableDefinition9 = array(
				
					6=>new ParserAction($this->reduce, $table30)
				);

			$tableDefinition10 = array(
				
					43=>new ParserAction($this->shift, $table31)
				);

			$tableDefinition11 = array(
				
					6=>new ParserAction($this->reduce, $table41)
				);

			$tableDefinition12 = array(
				
					6=>new ParserAction($this->reduce, $table15),
					28=>new ParserAction($this->reduce, $table15)
				);

			$tableDefinition13 = array(
				
					6=>new ParserAction($this->reduce, $table16),
					15=>new ParserAction($this->shift, $table32),
					28=>new ParserAction($this->reduce, $table16)
				);

			$tableDefinition14 = array(
				
					6=>new ParserAction($this->reduce, $table29),
					25=>new ParserAction($this->shift, $table33)
				);

			$tableDefinition15 = array(
				
					42=>new ParserAction($this->shift, $table34),
					43=>new ParserAction($this->reduce, $table32)
				);

			$tableDefinition16 = array(
				
					6=>new ParserAction($this->reduce, $table40),
					25=>new ParserAction($this->shift, $table35)
				);

			$tableDefinition17 = array(
				
					6=>new ParserAction($this->reduce, $table14),
					25=>new ParserAction($this->shift, $table36),
					28=>new ParserAction($this->reduce, $table14)
				);

			$tableDefinition18 = array(
				
					13=>new ParserAction($this->none, $table37),
					19=>new ParserAction($this->none, $table41),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					51=>new ParserAction($this->shift, $table38),
					52=>new ParserAction($this->none, $table39),
					53=>new ParserAction($this->none, $table40),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition19 = array(
				
					6=>new ParserAction($this->reduce, $table27),
					21=>new ParserAction($this->shift, $table53),
					25=>new ParserAction($this->reduce, $table27)
				);

			$tableDefinition20 = array(
				
					6=>new ParserAction($this->reduce, $table38),
					21=>new ParserAction($this->shift, $table54),
					25=>new ParserAction($this->reduce, $table38)
				);

			$tableDefinition21 = array(
				
					6=>new ParserAction($this->reduce, $table12),
					21=>new ParserAction($this->shift, $table55),
					25=>new ParserAction($this->reduce, $table12),
					28=>new ParserAction($this->reduce, $table12)
				);

			$tableDefinition22 = array(
				
					6=>new ParserAction($this->reduce, $table25),
					18=>new ParserAction($this->shift, $table56),
					21=>new ParserAction($this->reduce, $table25),
					25=>new ParserAction($this->reduce, $table25)
				);

			$tableDefinition23 = array(
				
					6=>new ParserAction($this->reduce, $table36),
					18=>new ParserAction($this->shift, $table57),
					21=>new ParserAction($this->reduce, $table36),
					25=>new ParserAction($this->reduce, $table36)
				);

			$tableDefinition24 = array(
				
					6=>new ParserAction($this->reduce, $table10),
					18=>new ParserAction($this->shift, $table58),
					21=>new ParserAction($this->reduce, $table10),
					25=>new ParserAction($this->reduce, $table10),
					28=>new ParserAction($this->reduce, $table10)
				);

			$tableDefinition25 = array(
				
					16=>new ParserAction($this->none, $table59),
					49=>new ParserAction($this->shift, $table60),
					50=>new ParserAction($this->shift, $table61)
				);

			$tableDefinition26 = array(
				
					15=>new ParserAction($this->shift, $table62)
				);

			$tableDefinition27 = array(
				
					31=>new ParserAction($this->none, $table63),
					32=>new ParserAction($this->shift, $table64),
					49=>new ParserAction($this->reduce, $table20),
					50=>new ParserAction($this->reduce, $table20)
				);

			$tableDefinition28 = array(
				
					6=>new ParserAction($this->shift, $table65)
				);

			$tableDefinition29 = array(
				
					1=>new ParserAction($this->reduce, $table2)
				);

			$tableDefinition30 = array(
				
					11=>new ParserAction($this->none, $table13),
					12=>new ParserAction($this->shift, $table18),
					14=>new ParserAction($this->none, $table24),
					17=>new ParserAction($this->none, $table21),
					20=>new ParserAction($this->none, $table17),
					24=>new ParserAction($this->none, $table12),
					27=>new ParserAction($this->none, $table66)
				);

			$tableDefinition31 = array(
				
					16=>new ParserAction($this->none, $table67),
					49=>new ParserAction($this->shift, $table60),
					50=>new ParserAction($this->shift, $table61)
				);

			$tableDefinition32 = array(
				
					16=>new ParserAction($this->none, $table68),
					49=>new ParserAction($this->shift, $table60),
					50=>new ParserAction($this->shift, $table61)
				);

			$tableDefinition33 = array(
				
					26=>new ParserAction($this->none, $table69),
					33=>new ParserAction($this->shift, $table70)
				);

			$tableDefinition34 = array(
				
					43=>new ParserAction($this->reduce, $table31)
				);

			$tableDefinition35 = array(
				
					26=>new ParserAction($this->none, $table71),
					33=>new ParserAction($this->shift, $table70)
				);

			$tableDefinition36 = array(
				
					26=>new ParserAction($this->none, $table72),
					33=>new ParserAction($this->shift, $table70)
				);

			$tableDefinition37 = array(
				
					6=>new ParserAction($this->reduce, $table7),
					15=>new ParserAction($this->reduce, $table7),
					28=>new ParserAction($this->reduce, $table7)
				);

			$tableDefinition38 = array(
				
					6=>new ParserAction($this->reduce, $table44),
					15=>new ParserAction($this->reduce, $table44),
					28=>new ParserAction($this->reduce, $table44)
				);

			$tableDefinition39 = array(
				
					6=>new ParserAction($this->reduce, $table45),
					15=>new ParserAction($this->reduce, $table45),
					28=>new ParserAction($this->reduce, $table45),
					54=>new ParserAction($this->shift, $table73)
				);

			$tableDefinition40 = array(
				
					6=>new ParserAction($this->reduce, $table46),
					15=>new ParserAction($this->reduce, $table46),
					28=>new ParserAction($this->reduce, $table46),
					54=>new ParserAction($this->reduce, $table46)
				);

			$tableDefinition41 = array(
				
					6=>new ParserAction($this->reduce, $table48),
					15=>new ParserAction($this->reduce, $table48),
					28=>new ParserAction($this->reduce, $table48),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table48),
					55=>new ParserAction($this->shift, $table74),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85)
				);

			$tableDefinition42 = array(
				
					6=>new ParserAction($this->reduce, $table56),
					15=>new ParserAction($this->reduce, $table56),
					18=>new ParserAction($this->reduce, $table56),
					21=>new ParserAction($this->reduce, $table56),
					25=>new ParserAction($this->reduce, $table56),
					28=>new ParserAction($this->reduce, $table56),
					35=>new ParserAction($this->reduce, $table56),
					51=>new ParserAction($this->reduce, $table56),
					54=>new ParserAction($this->reduce, $table56),
					55=>new ParserAction($this->reduce, $table56),
					62=>new ParserAction($this->reduce, $table56),
					63=>new ParserAction($this->reduce, $table56),
					64=>new ParserAction($this->reduce, $table56),
					65=>new ParserAction($this->reduce, $table56),
					66=>new ParserAction($this->reduce, $table56),
					67=>new ParserAction($this->reduce, $table56),
					68=>new ParserAction($this->reduce, $table56),
					69=>new ParserAction($this->reduce, $table56),
					70=>new ParserAction($this->reduce, $table56),
					71=>new ParserAction($this->reduce, $table56),
					72=>new ParserAction($this->reduce, $table56),
					75=>new ParserAction($this->reduce, $table56),
					81=>new ParserAction($this->reduce, $table56),
					82=>new ParserAction($this->reduce, $table56)
				);

			$tableDefinition43 = array(
				
					6=>new ParserAction($this->reduce, $table57),
					15=>new ParserAction($this->reduce, $table57),
					18=>new ParserAction($this->reduce, $table57),
					21=>new ParserAction($this->reduce, $table57),
					25=>new ParserAction($this->reduce, $table57),
					28=>new ParserAction($this->reduce, $table57),
					35=>new ParserAction($this->reduce, $table57),
					51=>new ParserAction($this->reduce, $table57),
					54=>new ParserAction($this->reduce, $table57),
					55=>new ParserAction($this->reduce, $table57),
					62=>new ParserAction($this->reduce, $table57),
					63=>new ParserAction($this->reduce, $table57),
					64=>new ParserAction($this->reduce, $table57),
					65=>new ParserAction($this->reduce, $table57),
					66=>new ParserAction($this->reduce, $table57),
					67=>new ParserAction($this->reduce, $table57),
					68=>new ParserAction($this->reduce, $table57),
					69=>new ParserAction($this->reduce, $table57),
					70=>new ParserAction($this->reduce, $table57),
					71=>new ParserAction($this->reduce, $table57),
					72=>new ParserAction($this->reduce, $table57),
					75=>new ParserAction($this->reduce, $table57),
					81=>new ParserAction($this->reduce, $table57),
					82=>new ParserAction($this->reduce, $table57)
				);

			$tableDefinition44 = array(
				
					6=>new ParserAction($this->reduce, $table58),
					15=>new ParserAction($this->reduce, $table58),
					18=>new ParserAction($this->reduce, $table58),
					21=>new ParserAction($this->reduce, $table58),
					25=>new ParserAction($this->reduce, $table58),
					28=>new ParserAction($this->reduce, $table58),
					35=>new ParserAction($this->reduce, $table58),
					51=>new ParserAction($this->reduce, $table58),
					54=>new ParserAction($this->reduce, $table58),
					55=>new ParserAction($this->reduce, $table58),
					62=>new ParserAction($this->reduce, $table58),
					63=>new ParserAction($this->reduce, $table58),
					64=>new ParserAction($this->reduce, $table58),
					65=>new ParserAction($this->reduce, $table58),
					66=>new ParserAction($this->reduce, $table58),
					67=>new ParserAction($this->reduce, $table58),
					68=>new ParserAction($this->reduce, $table58),
					69=>new ParserAction($this->reduce, $table58),
					70=>new ParserAction($this->reduce, $table58),
					71=>new ParserAction($this->reduce, $table58),
					72=>new ParserAction($this->reduce, $table58),
					75=>new ParserAction($this->reduce, $table58),
					81=>new ParserAction($this->reduce, $table58),
					82=>new ParserAction($this->reduce, $table58)
				);

			$tableDefinition45 = array(
				
					6=>new ParserAction($this->reduce, $table59),
					15=>new ParserAction($this->reduce, $table59),
					18=>new ParserAction($this->reduce, $table59),
					21=>new ParserAction($this->reduce, $table59),
					25=>new ParserAction($this->reduce, $table59),
					28=>new ParserAction($this->reduce, $table59),
					35=>new ParserAction($this->reduce, $table59),
					51=>new ParserAction($this->reduce, $table59),
					54=>new ParserAction($this->reduce, $table59),
					55=>new ParserAction($this->reduce, $table59),
					62=>new ParserAction($this->reduce, $table59),
					63=>new ParserAction($this->reduce, $table59),
					64=>new ParserAction($this->reduce, $table59),
					65=>new ParserAction($this->reduce, $table59),
					66=>new ParserAction($this->reduce, $table59),
					67=>new ParserAction($this->reduce, $table59),
					68=>new ParserAction($this->reduce, $table59),
					69=>new ParserAction($this->reduce, $table59),
					70=>new ParserAction($this->reduce, $table59),
					71=>new ParserAction($this->reduce, $table59),
					72=>new ParserAction($this->reduce, $table59),
					75=>new ParserAction($this->reduce, $table59),
					81=>new ParserAction($this->reduce, $table59),
					82=>new ParserAction($this->reduce, $table59)
				);

			$tableDefinition46 = array(
				
					19=>new ParserAction($this->none, $table87),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition47 = array(
				
					19=>new ParserAction($this->none, $table88),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition48 = array(
				
					6=>new ParserAction($this->reduce, $table74),
					15=>new ParserAction($this->reduce, $table74),
					18=>new ParserAction($this->reduce, $table74),
					21=>new ParserAction($this->reduce, $table74),
					25=>new ParserAction($this->reduce, $table74),
					28=>new ParserAction($this->reduce, $table74),
					35=>new ParserAction($this->reduce, $table74),
					51=>new ParserAction($this->reduce, $table74),
					54=>new ParserAction($this->reduce, $table74),
					55=>new ParserAction($this->reduce, $table74),
					62=>new ParserAction($this->reduce, $table74),
					63=>new ParserAction($this->reduce, $table74),
					64=>new ParserAction($this->reduce, $table74),
					65=>new ParserAction($this->reduce, $table74),
					66=>new ParserAction($this->reduce, $table74),
					67=>new ParserAction($this->reduce, $table74),
					68=>new ParserAction($this->reduce, $table74),
					69=>new ParserAction($this->reduce, $table74),
					70=>new ParserAction($this->reduce, $table74),
					71=>new ParserAction($this->reduce, $table74),
					72=>new ParserAction($this->reduce, $table74),
					75=>new ParserAction($this->reduce, $table74),
					81=>new ParserAction($this->reduce, $table74),
					82=>new ParserAction($this->reduce, $table74)
				);

			$tableDefinition49 = array(
				
					19=>new ParserAction($this->none, $table89),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition50 = array(
				
					6=>new ParserAction($this->reduce, $table76),
					15=>new ParserAction($this->reduce, $table76),
					18=>new ParserAction($this->reduce, $table76),
					21=>new ParserAction($this->reduce, $table76),
					25=>new ParserAction($this->reduce, $table76),
					28=>new ParserAction($this->reduce, $table76),
					35=>new ParserAction($this->reduce, $table76),
					51=>new ParserAction($this->reduce, $table76),
					54=>new ParserAction($this->reduce, $table76),
					55=>new ParserAction($this->reduce, $table76),
					62=>new ParserAction($this->reduce, $table76),
					63=>new ParserAction($this->reduce, $table76),
					64=>new ParserAction($this->reduce, $table76),
					65=>new ParserAction($this->reduce, $table76),
					66=>new ParserAction($this->reduce, $table76),
					67=>new ParserAction($this->reduce, $table76),
					68=>new ParserAction($this->reduce, $table76),
					69=>new ParserAction($this->reduce, $table76),
					70=>new ParserAction($this->reduce, $table76),
					71=>new ParserAction($this->reduce, $table76),
					72=>new ParserAction($this->reduce, $table76),
					74=>new ParserAction($this->shift, $table90),
					75=>new ParserAction($this->reduce, $table76),
					81=>new ParserAction($this->reduce, $table76),
					82=>new ParserAction($this->reduce, $table76)
				);

			$tableDefinition51 = array(
				
					6=>new ParserAction($this->reduce, $table77),
					15=>new ParserAction($this->reduce, $table77),
					18=>new ParserAction($this->reduce, $table77),
					21=>new ParserAction($this->reduce, $table77),
					25=>new ParserAction($this->reduce, $table77),
					28=>new ParserAction($this->reduce, $table77),
					35=>new ParserAction($this->reduce, $table77),
					51=>new ParserAction($this->reduce, $table77),
					54=>new ParserAction($this->reduce, $table77),
					55=>new ParserAction($this->reduce, $table77),
					62=>new ParserAction($this->reduce, $table77),
					63=>new ParserAction($this->reduce, $table77),
					64=>new ParserAction($this->reduce, $table77),
					65=>new ParserAction($this->reduce, $table77),
					66=>new ParserAction($this->reduce, $table77),
					67=>new ParserAction($this->reduce, $table77),
					68=>new ParserAction($this->reduce, $table77),
					69=>new ParserAction($this->reduce, $table77),
					70=>new ParserAction($this->reduce, $table77),
					71=>new ParserAction($this->reduce, $table77),
					72=>new ParserAction($this->reduce, $table77),
					75=>new ParserAction($this->reduce, $table77),
					81=>new ParserAction($this->reduce, $table77),
					82=>new ParserAction($this->reduce, $table77)
				);

			$tableDefinition52 = array(
				
					6=>new ParserAction($this->reduce, $table78),
					15=>new ParserAction($this->reduce, $table78),
					18=>new ParserAction($this->reduce, $table78),
					21=>new ParserAction($this->reduce, $table78),
					25=>new ParserAction($this->reduce, $table78),
					28=>new ParserAction($this->reduce, $table78),
					35=>new ParserAction($this->reduce, $table78),
					51=>new ParserAction($this->reduce, $table78),
					54=>new ParserAction($this->reduce, $table78),
					55=>new ParserAction($this->reduce, $table78),
					62=>new ParserAction($this->reduce, $table78),
					63=>new ParserAction($this->reduce, $table78),
					64=>new ParserAction($this->reduce, $table78),
					65=>new ParserAction($this->reduce, $table78),
					66=>new ParserAction($this->reduce, $table78),
					67=>new ParserAction($this->reduce, $table78),
					68=>new ParserAction($this->reduce, $table78),
					69=>new ParserAction($this->reduce, $table78),
					70=>new ParserAction($this->reduce, $table78),
					71=>new ParserAction($this->reduce, $table78),
					72=>new ParserAction($this->reduce, $table78),
					75=>new ParserAction($this->reduce, $table78),
					81=>new ParserAction($this->reduce, $table78),
					82=>new ParserAction($this->reduce, $table78)
				);

			$tableDefinition53 = array(
				
					22=>new ParserAction($this->shift, $table91)
				);

			$tableDefinition54 = array(
				
					22=>new ParserAction($this->shift, $table92)
				);

			$tableDefinition55 = array(
				
					22=>new ParserAction($this->shift, $table93)
				);

			$tableDefinition56 = array(
				
					19=>new ParserAction($this->none, $table94),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition57 = array(
				
					19=>new ParserAction($this->none, $table95),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition58 = array(
				
					19=>new ParserAction($this->none, $table96),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition59 = array(
				
					35=>new ParserAction($this->shift, $table97)
				);

			$tableDefinition60 = array(
				
					6=>new ParserAction($this->reduce, $table42),
					18=>new ParserAction($this->reduce, $table42),
					21=>new ParserAction($this->reduce, $table42),
					25=>new ParserAction($this->reduce, $table42),
					28=>new ParserAction($this->reduce, $table42),
					35=>new ParserAction($this->reduce, $table42)
				);

			$tableDefinition61 = array(
				
					6=>new ParserAction($this->reduce, $table43),
					18=>new ParserAction($this->reduce, $table43),
					21=>new ParserAction($this->reduce, $table43),
					25=>new ParserAction($this->reduce, $table43),
					28=>new ParserAction($this->reduce, $table43),
					35=>new ParserAction($this->reduce, $table43)
				);

			$tableDefinition62 = array(
				
					16=>new ParserAction($this->none, $table98),
					49=>new ParserAction($this->shift, $table60),
					50=>new ParserAction($this->shift, $table61)
				);

			$tableDefinition63 = array(
				
					49=>new ParserAction($this->reduce, $table19),
					50=>new ParserAction($this->reduce, $table19)
				);

			$tableDefinition64 = array(
				
					33=>new ParserAction($this->shift, $table99),
					49=>new ParserAction($this->reduce, $table22),
					50=>new ParserAction($this->reduce, $table22)
				);

			$tableDefinition65 = array(
				
					1=>new ParserAction($this->reduce, $table1)
				);

			$tableDefinition66 = array(
				
					6=>new ParserAction($this->reduce, $table18),
					28=>new ParserAction($this->reduce, $table18)
				);

			$tableDefinition67 = array(
				
					35=>new ParserAction($this->shift, $table100)
				);

			$tableDefinition68 = array(
				
					6=>new ParserAction($this->reduce, $table8),
					18=>new ParserAction($this->reduce, $table8),
					21=>new ParserAction($this->reduce, $table8),
					25=>new ParserAction($this->reduce, $table8),
					28=>new ParserAction($this->reduce, $table8)
				);

			$tableDefinition69 = array(
				
					6=>new ParserAction($this->reduce, $table28)
				);

			$tableDefinition70 = array(
				
					6=>new ParserAction($this->reduce, $table90),
					28=>new ParserAction($this->reduce, $table90),
					54=>new ParserAction($this->shift, $table101)
				);

			$tableDefinition71 = array(
				
					6=>new ParserAction($this->reduce, $table39)
				);

			$tableDefinition72 = array(
				
					6=>new ParserAction($this->reduce, $table13),
					28=>new ParserAction($this->reduce, $table13)
				);

			$tableDefinition73 = array(
				
					19=>new ParserAction($this->none, $table41),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					53=>new ParserAction($this->none, $table102),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition74 = array(
				
					49=>new ParserAction($this->shift, $table103),
					50=>new ParserAction($this->shift, $table104)
				);

			$tableDefinition75 = array(
				
					19=>new ParserAction($this->none, $table105),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition76 = array(
				
					19=>new ParserAction($this->none, $table106),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition77 = array(
				
					19=>new ParserAction($this->none, $table107),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition78 = array(
				
					19=>new ParserAction($this->none, $table108),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition79 = array(
				
					19=>new ParserAction($this->none, $table109),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition80 = array(
				
					19=>new ParserAction($this->none, $table110),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition81 = array(
				
					19=>new ParserAction($this->none, $table111),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition82 = array(
				
					19=>new ParserAction($this->none, $table112),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition83 = array(
				
					19=>new ParserAction($this->none, $table113),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition84 = array(
				
					19=>new ParserAction($this->none, $table114),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition85 = array(
				
					19=>new ParserAction($this->none, $table115),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition86 = array(
				
					19=>new ParserAction($this->none, $table116),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition87 = array(
				
					6=>new ParserAction($this->reduce, $table60),
					15=>new ParserAction($this->reduce, $table60),
					18=>new ParserAction($this->reduce, $table60),
					21=>new ParserAction($this->reduce, $table60),
					25=>new ParserAction($this->reduce, $table60),
					28=>new ParserAction($this->reduce, $table60),
					35=>new ParserAction($this->reduce, $table60),
					51=>new ParserAction($this->reduce, $table60),
					54=>new ParserAction($this->reduce, $table60),
					55=>new ParserAction($this->reduce, $table60),
					62=>new ParserAction($this->reduce, $table60),
					63=>new ParserAction($this->reduce, $table60),
					64=>new ParserAction($this->reduce, $table60),
					65=>new ParserAction($this->reduce, $table60),
					66=>new ParserAction($this->reduce, $table60),
					67=>new ParserAction($this->reduce, $table60),
					68=>new ParserAction($this->reduce, $table60),
					69=>new ParserAction($this->reduce, $table60),
					70=>new ParserAction($this->reduce, $table60),
					71=>new ParserAction($this->reduce, $table60),
					72=>new ParserAction($this->reduce, $table60),
					75=>new ParserAction($this->reduce, $table60),
					81=>new ParserAction($this->reduce, $table60),
					82=>new ParserAction($this->reduce, $table60)
				);

			$tableDefinition88 = array(
				
					6=>new ParserAction($this->reduce, $table61),
					15=>new ParserAction($this->reduce, $table61),
					18=>new ParserAction($this->reduce, $table61),
					21=>new ParserAction($this->reduce, $table61),
					25=>new ParserAction($this->reduce, $table61),
					28=>new ParserAction($this->reduce, $table61),
					35=>new ParserAction($this->reduce, $table61),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table61),
					55=>new ParserAction($this->reduce, $table61),
					62=>new ParserAction($this->reduce, $table61),
					63=>new ParserAction($this->reduce, $table61),
					64=>new ParserAction($this->reduce, $table61),
					65=>new ParserAction($this->reduce, $table61),
					66=>new ParserAction($this->reduce, $table61),
					67=>new ParserAction($this->reduce, $table61),
					68=>new ParserAction($this->reduce, $table61),
					69=>new ParserAction($this->reduce, $table61),
					70=>new ParserAction($this->reduce, $table61),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->reduce, $table61),
					75=>new ParserAction($this->reduce, $table61),
					81=>new ParserAction($this->reduce, $table61),
					82=>new ParserAction($this->reduce, $table61)
				);

			$tableDefinition89 = array(
				
					51=>new ParserAction($this->shift, $table83),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->shift, $table117)
				);

			$tableDefinition90 = array(
				
					19=>new ParserAction($this->none, $table120),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					75=>new ParserAction($this->shift, $table118),
					76=>new ParserAction($this->shift, $table52),
					77=>new ParserAction($this->none, $table119)
				);

			$tableDefinition91 = array(
				
					19=>new ParserAction($this->none, $table125),
					23=>new ParserAction($this->none, $table121),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52),
					78=>new ParserAction($this->shift, $table122),
					79=>new ParserAction($this->none, $table123),
					80=>new ParserAction($this->none, $table124)
				);

			$tableDefinition92 = array(
				
					19=>new ParserAction($this->none, $table125),
					23=>new ParserAction($this->none, $table126),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52),
					78=>new ParserAction($this->shift, $table122),
					79=>new ParserAction($this->none, $table123),
					80=>new ParserAction($this->none, $table124)
				);

			$tableDefinition93 = array(
				
					19=>new ParserAction($this->none, $table125),
					23=>new ParserAction($this->none, $table127),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52),
					78=>new ParserAction($this->shift, $table122),
					79=>new ParserAction($this->none, $table123),
					80=>new ParserAction($this->none, $table124)
				);

			$tableDefinition94 = array(
				
					6=>new ParserAction($this->reduce, $table24),
					21=>new ParserAction($this->reduce, $table24),
					25=>new ParserAction($this->reduce, $table24),
					51=>new ParserAction($this->shift, $table83),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85)
				);

			$tableDefinition95 = array(
				
					6=>new ParserAction($this->reduce, $table35),
					21=>new ParserAction($this->reduce, $table35),
					25=>new ParserAction($this->reduce, $table35),
					51=>new ParserAction($this->shift, $table83),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85)
				);

			$tableDefinition96 = array(
				
					6=>new ParserAction($this->reduce, $table9),
					21=>new ParserAction($this->reduce, $table9),
					25=>new ParserAction($this->reduce, $table9),
					28=>new ParserAction($this->reduce, $table9),
					51=>new ParserAction($this->shift, $table83),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85)
				);

			$tableDefinition97 = array(
				
					36=>new ParserAction($this->none, $table128),
					49=>new ParserAction($this->shift, $table130),
					50=>new ParserAction($this->shift, $table131),
					56=>new ParserAction($this->none, $table129)
				);

			$tableDefinition98 = array(
				
					6=>new ParserAction($this->reduce, $table34),
					18=>new ParserAction($this->reduce, $table34),
					21=>new ParserAction($this->reduce, $table34),
					25=>new ParserAction($this->reduce, $table34)
				);

			$tableDefinition99 = array(
				
					49=>new ParserAction($this->reduce, $table21),
					50=>new ParserAction($this->reduce, $table21)
				);

			$tableDefinition100 = array(
				
					36=>new ParserAction($this->none, $table132),
					49=>new ParserAction($this->shift, $table130),
					50=>new ParserAction($this->shift, $table131),
					56=>new ParserAction($this->none, $table129)
				);

			$tableDefinition101 = array(
				
					33=>new ParserAction($this->shift, $table133)
				);

			$tableDefinition102 = array(
				
					6=>new ParserAction($this->reduce, $table47),
					15=>new ParserAction($this->reduce, $table47),
					28=>new ParserAction($this->reduce, $table47),
					54=>new ParserAction($this->reduce, $table47)
				);

			$tableDefinition103 = array(
				
					6=>new ParserAction($this->reduce, $table49),
					15=>new ParserAction($this->reduce, $table49),
					28=>new ParserAction($this->reduce, $table49),
					54=>new ParserAction($this->reduce, $table49)
				);

			$tableDefinition104 = array(
				
					6=>new ParserAction($this->reduce, $table50),
					15=>new ParserAction($this->reduce, $table50),
					28=>new ParserAction($this->reduce, $table50),
					54=>new ParserAction($this->reduce, $table50)
				);

			$tableDefinition105 = array(
				
					6=>new ParserAction($this->reduce, $table62),
					15=>new ParserAction($this->reduce, $table62),
					18=>new ParserAction($this->reduce, $table62),
					21=>new ParserAction($this->reduce, $table62),
					25=>new ParserAction($this->reduce, $table62),
					28=>new ParserAction($this->reduce, $table62),
					35=>new ParserAction($this->reduce, $table62),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table62),
					55=>new ParserAction($this->reduce, $table62),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table62),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table62),
					81=>new ParserAction($this->reduce, $table62),
					82=>new ParserAction($this->reduce, $table62)
				);

			$tableDefinition106 = array(
				
					6=>new ParserAction($this->reduce, $table63),
					15=>new ParserAction($this->reduce, $table63),
					18=>new ParserAction($this->reduce, $table63),
					21=>new ParserAction($this->reduce, $table63),
					25=>new ParserAction($this->reduce, $table63),
					28=>new ParserAction($this->reduce, $table63),
					35=>new ParserAction($this->reduce, $table63),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table63),
					55=>new ParserAction($this->reduce, $table63),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table63),
					64=>new ParserAction($this->reduce, $table63),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table63),
					81=>new ParserAction($this->reduce, $table63),
					82=>new ParserAction($this->reduce, $table63)
				);

			$tableDefinition107 = array(
				
					6=>new ParserAction($this->reduce, $table64),
					15=>new ParserAction($this->reduce, $table64),
					18=>new ParserAction($this->reduce, $table64),
					21=>new ParserAction($this->reduce, $table64),
					25=>new ParserAction($this->reduce, $table64),
					28=>new ParserAction($this->reduce, $table64),
					35=>new ParserAction($this->reduce, $table64),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table64),
					55=>new ParserAction($this->reduce, $table64),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table64),
					64=>new ParserAction($this->reduce, $table64),
					65=>new ParserAction($this->reduce, $table64),
					66=>new ParserAction($this->reduce, $table64),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table64),
					81=>new ParserAction($this->reduce, $table64),
					82=>new ParserAction($this->reduce, $table64)
				);

			$tableDefinition108 = array(
				
					6=>new ParserAction($this->reduce, $table65),
					15=>new ParserAction($this->reduce, $table65),
					18=>new ParserAction($this->reduce, $table65),
					21=>new ParserAction($this->reduce, $table65),
					25=>new ParserAction($this->reduce, $table65),
					28=>new ParserAction($this->reduce, $table65),
					35=>new ParserAction($this->reduce, $table65),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table65),
					55=>new ParserAction($this->reduce, $table65),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table65),
					64=>new ParserAction($this->reduce, $table65),
					65=>new ParserAction($this->reduce, $table65),
					66=>new ParserAction($this->reduce, $table65),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table65),
					81=>new ParserAction($this->reduce, $table65),
					82=>new ParserAction($this->reduce, $table65)
				);

			$tableDefinition109 = array(
				
					6=>new ParserAction($this->reduce, $table66),
					15=>new ParserAction($this->reduce, $table66),
					18=>new ParserAction($this->reduce, $table66),
					21=>new ParserAction($this->reduce, $table66),
					25=>new ParserAction($this->reduce, $table66),
					28=>new ParserAction($this->reduce, $table66),
					35=>new ParserAction($this->reduce, $table66),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table66),
					55=>new ParserAction($this->reduce, $table66),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table66),
					64=>new ParserAction($this->reduce, $table66),
					65=>new ParserAction($this->reduce, $table66),
					66=>new ParserAction($this->reduce, $table66),
					67=>new ParserAction($this->reduce, $table66),
					68=>new ParserAction($this->reduce, $table66),
					69=>new ParserAction($this->reduce, $table66),
					70=>new ParserAction($this->reduce, $table66),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table66),
					81=>new ParserAction($this->reduce, $table66),
					82=>new ParserAction($this->reduce, $table66)
				);

			$tableDefinition110 = array(
				
					6=>new ParserAction($this->reduce, $table67),
					15=>new ParserAction($this->reduce, $table67),
					18=>new ParserAction($this->reduce, $table67),
					21=>new ParserAction($this->reduce, $table67),
					25=>new ParserAction($this->reduce, $table67),
					28=>new ParserAction($this->reduce, $table67),
					35=>new ParserAction($this->reduce, $table67),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table67),
					55=>new ParserAction($this->reduce, $table67),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table67),
					64=>new ParserAction($this->reduce, $table67),
					65=>new ParserAction($this->reduce, $table67),
					66=>new ParserAction($this->reduce, $table67),
					67=>new ParserAction($this->reduce, $table67),
					68=>new ParserAction($this->reduce, $table67),
					69=>new ParserAction($this->reduce, $table67),
					70=>new ParserAction($this->reduce, $table67),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table67),
					81=>new ParserAction($this->reduce, $table67),
					82=>new ParserAction($this->reduce, $table67)
				);

			$tableDefinition111 = array(
				
					6=>new ParserAction($this->reduce, $table68),
					15=>new ParserAction($this->reduce, $table68),
					18=>new ParserAction($this->reduce, $table68),
					21=>new ParserAction($this->reduce, $table68),
					25=>new ParserAction($this->reduce, $table68),
					28=>new ParserAction($this->reduce, $table68),
					35=>new ParserAction($this->reduce, $table68),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table68),
					55=>new ParserAction($this->reduce, $table68),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table68),
					64=>new ParserAction($this->reduce, $table68),
					65=>new ParserAction($this->reduce, $table68),
					66=>new ParserAction($this->reduce, $table68),
					67=>new ParserAction($this->reduce, $table68),
					68=>new ParserAction($this->reduce, $table68),
					69=>new ParserAction($this->reduce, $table68),
					70=>new ParserAction($this->reduce, $table68),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table68),
					81=>new ParserAction($this->reduce, $table68),
					82=>new ParserAction($this->reduce, $table68)
				);

			$tableDefinition112 = array(
				
					6=>new ParserAction($this->reduce, $table69),
					15=>new ParserAction($this->reduce, $table69),
					18=>new ParserAction($this->reduce, $table69),
					21=>new ParserAction($this->reduce, $table69),
					25=>new ParserAction($this->reduce, $table69),
					28=>new ParserAction($this->reduce, $table69),
					35=>new ParserAction($this->reduce, $table69),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table69),
					55=>new ParserAction($this->reduce, $table69),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->reduce, $table69),
					64=>new ParserAction($this->reduce, $table69),
					65=>new ParserAction($this->reduce, $table69),
					66=>new ParserAction($this->reduce, $table69),
					67=>new ParserAction($this->reduce, $table69),
					68=>new ParserAction($this->reduce, $table69),
					69=>new ParserAction($this->reduce, $table69),
					70=>new ParserAction($this->reduce, $table69),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table69),
					81=>new ParserAction($this->reduce, $table69),
					82=>new ParserAction($this->reduce, $table69)
				);

			$tableDefinition113 = array(
				
					6=>new ParserAction($this->reduce, $table70),
					15=>new ParserAction($this->reduce, $table70),
					18=>new ParserAction($this->reduce, $table70),
					21=>new ParserAction($this->reduce, $table70),
					25=>new ParserAction($this->reduce, $table70),
					28=>new ParserAction($this->reduce, $table70),
					35=>new ParserAction($this->reduce, $table70),
					51=>new ParserAction($this->reduce, $table70),
					54=>new ParserAction($this->reduce, $table70),
					55=>new ParserAction($this->reduce, $table70),
					62=>new ParserAction($this->reduce, $table70),
					63=>new ParserAction($this->reduce, $table70),
					64=>new ParserAction($this->reduce, $table70),
					65=>new ParserAction($this->reduce, $table70),
					66=>new ParserAction($this->reduce, $table70),
					67=>new ParserAction($this->reduce, $table70),
					68=>new ParserAction($this->reduce, $table70),
					69=>new ParserAction($this->reduce, $table70),
					70=>new ParserAction($this->reduce, $table70),
					71=>new ParserAction($this->reduce, $table70),
					72=>new ParserAction($this->reduce, $table70),
					75=>new ParserAction($this->reduce, $table70),
					81=>new ParserAction($this->reduce, $table70),
					82=>new ParserAction($this->reduce, $table70)
				);

			$tableDefinition114 = array(
				
					6=>new ParserAction($this->reduce, $table71),
					15=>new ParserAction($this->reduce, $table71),
					18=>new ParserAction($this->reduce, $table71),
					21=>new ParserAction($this->reduce, $table71),
					25=>new ParserAction($this->reduce, $table71),
					28=>new ParserAction($this->reduce, $table71),
					35=>new ParserAction($this->reduce, $table71),
					51=>new ParserAction($this->reduce, $table71),
					54=>new ParserAction($this->reduce, $table71),
					55=>new ParserAction($this->reduce, $table71),
					62=>new ParserAction($this->reduce, $table71),
					63=>new ParserAction($this->reduce, $table71),
					64=>new ParserAction($this->reduce, $table71),
					65=>new ParserAction($this->reduce, $table71),
					66=>new ParserAction($this->reduce, $table71),
					67=>new ParserAction($this->reduce, $table71),
					68=>new ParserAction($this->reduce, $table71),
					69=>new ParserAction($this->reduce, $table71),
					70=>new ParserAction($this->reduce, $table71),
					71=>new ParserAction($this->reduce, $table71),
					72=>new ParserAction($this->reduce, $table71),
					75=>new ParserAction($this->reduce, $table71),
					81=>new ParserAction($this->reduce, $table71),
					82=>new ParserAction($this->reduce, $table71)
				);

			$tableDefinition115 = array(
				
					6=>new ParserAction($this->reduce, $table72),
					15=>new ParserAction($this->reduce, $table72),
					18=>new ParserAction($this->reduce, $table72),
					21=>new ParserAction($this->reduce, $table72),
					25=>new ParserAction($this->reduce, $table72),
					28=>new ParserAction($this->reduce, $table72),
					35=>new ParserAction($this->reduce, $table72),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table72),
					55=>new ParserAction($this->reduce, $table72),
					62=>new ParserAction($this->reduce, $table72),
					63=>new ParserAction($this->reduce, $table72),
					64=>new ParserAction($this->reduce, $table72),
					65=>new ParserAction($this->reduce, $table72),
					66=>new ParserAction($this->reduce, $table72),
					67=>new ParserAction($this->reduce, $table72),
					68=>new ParserAction($this->reduce, $table72),
					69=>new ParserAction($this->reduce, $table72),
					70=>new ParserAction($this->reduce, $table72),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->reduce, $table72),
					75=>new ParserAction($this->reduce, $table72),
					81=>new ParserAction($this->reduce, $table72),
					82=>new ParserAction($this->reduce, $table72)
				);

			$tableDefinition116 = array(
				
					6=>new ParserAction($this->reduce, $table73),
					15=>new ParserAction($this->reduce, $table73),
					18=>new ParserAction($this->reduce, $table73),
					21=>new ParserAction($this->reduce, $table73),
					25=>new ParserAction($this->reduce, $table73),
					28=>new ParserAction($this->reduce, $table73),
					35=>new ParserAction($this->reduce, $table73),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table73),
					55=>new ParserAction($this->reduce, $table73),
					62=>new ParserAction($this->reduce, $table73),
					63=>new ParserAction($this->reduce, $table73),
					64=>new ParserAction($this->reduce, $table73),
					65=>new ParserAction($this->reduce, $table73),
					66=>new ParserAction($this->reduce, $table73),
					67=>new ParserAction($this->reduce, $table73),
					68=>new ParserAction($this->reduce, $table73),
					69=>new ParserAction($this->reduce, $table73),
					70=>new ParserAction($this->reduce, $table73),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->reduce, $table73),
					75=>new ParserAction($this->reduce, $table73),
					81=>new ParserAction($this->reduce, $table73),
					82=>new ParserAction($this->reduce, $table73)
				);

			$tableDefinition117 = array(
				
					6=>new ParserAction($this->reduce, $table75),
					15=>new ParserAction($this->reduce, $table75),
					18=>new ParserAction($this->reduce, $table75),
					21=>new ParserAction($this->reduce, $table75),
					25=>new ParserAction($this->reduce, $table75),
					28=>new ParserAction($this->reduce, $table75),
					35=>new ParserAction($this->reduce, $table75),
					51=>new ParserAction($this->reduce, $table75),
					54=>new ParserAction($this->reduce, $table75),
					55=>new ParserAction($this->reduce, $table75),
					62=>new ParserAction($this->reduce, $table75),
					63=>new ParserAction($this->reduce, $table75),
					64=>new ParserAction($this->reduce, $table75),
					65=>new ParserAction($this->reduce, $table75),
					66=>new ParserAction($this->reduce, $table75),
					67=>new ParserAction($this->reduce, $table75),
					68=>new ParserAction($this->reduce, $table75),
					69=>new ParserAction($this->reduce, $table75),
					70=>new ParserAction($this->reduce, $table75),
					71=>new ParserAction($this->reduce, $table75),
					72=>new ParserAction($this->reduce, $table75),
					75=>new ParserAction($this->reduce, $table75),
					81=>new ParserAction($this->reduce, $table75),
					82=>new ParserAction($this->reduce, $table75)
				);

			$tableDefinition118 = array(
				
					6=>new ParserAction($this->reduce, $table79),
					15=>new ParserAction($this->reduce, $table79),
					18=>new ParserAction($this->reduce, $table79),
					21=>new ParserAction($this->reduce, $table79),
					25=>new ParserAction($this->reduce, $table79),
					28=>new ParserAction($this->reduce, $table79),
					35=>new ParserAction($this->reduce, $table79),
					51=>new ParserAction($this->reduce, $table79),
					54=>new ParserAction($this->reduce, $table79),
					55=>new ParserAction($this->reduce, $table79),
					62=>new ParserAction($this->reduce, $table79),
					63=>new ParserAction($this->reduce, $table79),
					64=>new ParserAction($this->reduce, $table79),
					65=>new ParserAction($this->reduce, $table79),
					66=>new ParserAction($this->reduce, $table79),
					67=>new ParserAction($this->reduce, $table79),
					68=>new ParserAction($this->reduce, $table79),
					69=>new ParserAction($this->reduce, $table79),
					70=>new ParserAction($this->reduce, $table79),
					71=>new ParserAction($this->reduce, $table79),
					72=>new ParserAction($this->reduce, $table79),
					75=>new ParserAction($this->reduce, $table79),
					81=>new ParserAction($this->reduce, $table79),
					82=>new ParserAction($this->reduce, $table79)
				);

			$tableDefinition119 = array(
				
					54=>new ParserAction($this->shift, $table135),
					75=>new ParserAction($this->shift, $table134)
				);

			$tableDefinition120 = array(
				
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table81),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table81)
				);

			$tableDefinition121 = array(
				
					6=>new ParserAction($this->reduce, $table26),
					25=>new ParserAction($this->reduce, $table26)
				);

			$tableDefinition122 = array(
				
					6=>new ParserAction($this->reduce, $table83),
					25=>new ParserAction($this->reduce, $table83),
					28=>new ParserAction($this->reduce, $table83)
				);

			$tableDefinition123 = array(
				
					6=>new ParserAction($this->reduce, $table84),
					25=>new ParserAction($this->reduce, $table84),
					28=>new ParserAction($this->reduce, $table84),
					54=>new ParserAction($this->shift, $table136)
				);

			$tableDefinition124 = array(
				
					6=>new ParserAction($this->reduce, $table85),
					25=>new ParserAction($this->reduce, $table85),
					28=>new ParserAction($this->reduce, $table85),
					54=>new ParserAction($this->reduce, $table85)
				);

			$tableDefinition125 = array(
				
					6=>new ParserAction($this->reduce, $table89),
					25=>new ParserAction($this->reduce, $table89),
					28=>new ParserAction($this->reduce, $table89),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table89),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					81=>new ParserAction($this->shift, $table137),
					82=>new ParserAction($this->shift, $table138)
				);

			$tableDefinition126 = array(
				
					6=>new ParserAction($this->reduce, $table37),
					25=>new ParserAction($this->reduce, $table37)
				);

			$tableDefinition127 = array(
				
					6=>new ParserAction($this->reduce, $table11),
					25=>new ParserAction($this->reduce, $table11),
					28=>new ParserAction($this->reduce, $table11)
				);

			$tableDefinition128 = array(
				
					6=>new ParserAction($this->reduce, $table23),
					18=>new ParserAction($this->reduce, $table23),
					21=>new ParserAction($this->reduce, $table23),
					25=>new ParserAction($this->reduce, $table23),
					35=>new ParserAction($this->shift, $table139),
					54=>new ParserAction($this->shift, $table140)
				);

			$tableDefinition129 = array(
				
					6=>new ParserAction($this->reduce, $table51),
					18=>new ParserAction($this->reduce, $table51),
					21=>new ParserAction($this->reduce, $table51),
					25=>new ParserAction($this->reduce, $table51),
					35=>new ParserAction($this->reduce, $table51),
					54=>new ParserAction($this->reduce, $table51)
				);

			$tableDefinition130 = array(
				
					57=>new ParserAction($this->shift, $table141)
				);

			$tableDefinition131 = array(
				
					57=>new ParserAction($this->shift, $table142)
				);

			$tableDefinition132 = array(
				
					6=>new ParserAction($this->reduce, $table33),
					35=>new ParserAction($this->shift, $table139),
					54=>new ParserAction($this->shift, $table140)
				);

			$tableDefinition133 = array(
				
					6=>new ParserAction($this->reduce, $table91),
					28=>new ParserAction($this->reduce, $table91)
				);

			$tableDefinition134 = array(
				
					6=>new ParserAction($this->reduce, $table80),
					15=>new ParserAction($this->reduce, $table80),
					18=>new ParserAction($this->reduce, $table80),
					21=>new ParserAction($this->reduce, $table80),
					25=>new ParserAction($this->reduce, $table80),
					28=>new ParserAction($this->reduce, $table80),
					35=>new ParserAction($this->reduce, $table80),
					51=>new ParserAction($this->reduce, $table80),
					54=>new ParserAction($this->reduce, $table80),
					55=>new ParserAction($this->reduce, $table80),
					62=>new ParserAction($this->reduce, $table80),
					63=>new ParserAction($this->reduce, $table80),
					64=>new ParserAction($this->reduce, $table80),
					65=>new ParserAction($this->reduce, $table80),
					66=>new ParserAction($this->reduce, $table80),
					67=>new ParserAction($this->reduce, $table80),
					68=>new ParserAction($this->reduce, $table80),
					69=>new ParserAction($this->reduce, $table80),
					70=>new ParserAction($this->reduce, $table80),
					71=>new ParserAction($this->reduce, $table80),
					72=>new ParserAction($this->reduce, $table80),
					75=>new ParserAction($this->reduce, $table80),
					81=>new ParserAction($this->reduce, $table80),
					82=>new ParserAction($this->reduce, $table80)
				);

			$tableDefinition135 = array(
				
					19=>new ParserAction($this->none, $table143),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition136 = array(
				
					19=>new ParserAction($this->none, $table125),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52),
					80=>new ParserAction($this->none, $table144)
				);

			$tableDefinition137 = array(
				
					6=>new ParserAction($this->reduce, $table87),
					25=>new ParserAction($this->reduce, $table87),
					28=>new ParserAction($this->reduce, $table87),
					54=>new ParserAction($this->reduce, $table87)
				);

			$tableDefinition138 = array(
				
					6=>new ParserAction($this->reduce, $table88),
					25=>new ParserAction($this->reduce, $table88),
					28=>new ParserAction($this->reduce, $table88),
					54=>new ParserAction($this->reduce, $table88)
				);

			$tableDefinition139 = array(
				
					49=>new ParserAction($this->shift, $table130),
					50=>new ParserAction($this->shift, $table131),
					56=>new ParserAction($this->none, $table145)
				);

			$tableDefinition140 = array(
				
					49=>new ParserAction($this->shift, $table130),
					50=>new ParserAction($this->shift, $table131),
					56=>new ParserAction($this->none, $table146)
				);

			$tableDefinition141 = array(
				
					19=>new ParserAction($this->none, $table147),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition142 = array(
				
					19=>new ParserAction($this->none, $table148),
					33=>new ParserAction($this->shift, $table42),
					49=>new ParserAction($this->shift, $table50),
					50=>new ParserAction($this->shift, $table51),
					58=>new ParserAction($this->shift, $table43),
					59=>new ParserAction($this->shift, $table44),
					60=>new ParserAction($this->shift, $table45),
					61=>new ParserAction($this->shift, $table46),
					62=>new ParserAction($this->shift, $table47),
					73=>new ParserAction($this->none, $table48),
					74=>new ParserAction($this->shift, $table49),
					76=>new ParserAction($this->shift, $table52)
				);

			$tableDefinition143 = array(
				
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table82),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85),
					75=>new ParserAction($this->reduce, $table82)
				);

			$tableDefinition144 = array(
				
					6=>new ParserAction($this->reduce, $table86),
					25=>new ParserAction($this->reduce, $table86),
					28=>new ParserAction($this->reduce, $table86),
					54=>new ParserAction($this->reduce, $table86)
				);

			$tableDefinition145 = array(
				
					6=>new ParserAction($this->reduce, $table52),
					18=>new ParserAction($this->reduce, $table52),
					21=>new ParserAction($this->reduce, $table52),
					25=>new ParserAction($this->reduce, $table52),
					35=>new ParserAction($this->reduce, $table52),
					54=>new ParserAction($this->reduce, $table52)
				);

			$tableDefinition146 = array(
				
					6=>new ParserAction($this->reduce, $table53),
					18=>new ParserAction($this->reduce, $table53),
					21=>new ParserAction($this->reduce, $table53),
					25=>new ParserAction($this->reduce, $table53),
					35=>new ParserAction($this->reduce, $table53),
					54=>new ParserAction($this->reduce, $table53)
				);

			$tableDefinition147 = array(
				
					6=>new ParserAction($this->reduce, $table54),
					18=>new ParserAction($this->reduce, $table54),
					21=>new ParserAction($this->reduce, $table54),
					25=>new ParserAction($this->reduce, $table54),
					35=>new ParserAction($this->reduce, $table54),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table54),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85)
				);

			$tableDefinition148 = array(
				
					6=>new ParserAction($this->reduce, $table55),
					18=>new ParserAction($this->reduce, $table55),
					21=>new ParserAction($this->reduce, $table55),
					25=>new ParserAction($this->reduce, $table55),
					35=>new ParserAction($this->reduce, $table55),
					51=>new ParserAction($this->shift, $table83),
					54=>new ParserAction($this->reduce, $table55),
					62=>new ParserAction($this->shift, $table86),
					63=>new ParserAction($this->shift, $table75),
					64=>new ParserAction($this->shift, $table76),
					65=>new ParserAction($this->shift, $table77),
					66=>new ParserAction($this->shift, $table78),
					67=>new ParserAction($this->shift, $table79),
					68=>new ParserAction($this->shift, $table80),
					69=>new ParserAction($this->shift, $table81),
					70=>new ParserAction($this->shift, $table82),
					71=>new ParserAction($this->shift, $table84),
					72=>new ParserAction($this->shift, $table85)
				);

			$table0->setActions($tableDefinition0);
			$table1->setActions($tableDefinition1);
			$table2->setActions($tableDefinition2);
			$table3->setActions($tableDefinition3);
			$table4->setActions($tableDefinition4);
			$table5->setActions($tableDefinition5);
			$table6->setActions($tableDefinition6);
			$table7->setActions($tableDefinition7);
			$table8->setActions($tableDefinition8);
			$table9->setActions($tableDefinition9);
			$table10->setActions($tableDefinition10);
			$table11->setActions($tableDefinition11);
			$table12->setActions($tableDefinition12);
			$table13->setActions($tableDefinition13);
			$table14->setActions($tableDefinition14);
			$table15->setActions($tableDefinition15);
			$table16->setActions($tableDefinition16);
			$table17->setActions($tableDefinition17);
			$table18->setActions($tableDefinition18);
			$table19->setActions($tableDefinition19);
			$table20->setActions($tableDefinition20);
			$table21->setActions($tableDefinition21);
			$table22->setActions($tableDefinition22);
			$table23->setActions($tableDefinition23);
			$table24->setActions($tableDefinition24);
			$table25->setActions($tableDefinition25);
			$table26->setActions($tableDefinition26);
			$table27->setActions($tableDefinition27);
			$table28->setActions($tableDefinition28);
			$table29->setActions($tableDefinition29);
			$table30->setActions($tableDefinition30);
			$table31->setActions($tableDefinition31);
			$table32->setActions($tableDefinition32);
			$table33->setActions($tableDefinition33);
			$table34->setActions($tableDefinition34);
			$table35->setActions($tableDefinition35);
			$table36->setActions($tableDefinition36);
			$table37->setActions($tableDefinition37);
			$table38->setActions($tableDefinition38);
			$table39->setActions($tableDefinition39);
			$table40->setActions($tableDefinition40);
			$table41->setActions($tableDefinition41);
			$table42->setActions($tableDefinition42);
			$table43->setActions($tableDefinition43);
			$table44->setActions($tableDefinition44);
			$table45->setActions($tableDefinition45);
			$table46->setActions($tableDefinition46);
			$table47->setActions($tableDefinition47);
			$table48->setActions($tableDefinition48);
			$table49->setActions($tableDefinition49);
			$table50->setActions($tableDefinition50);
			$table51->setActions($tableDefinition51);
			$table52->setActions($tableDefinition52);
			$table53->setActions($tableDefinition53);
			$table54->setActions($tableDefinition54);
			$table55->setActions($tableDefinition55);
			$table56->setActions($tableDefinition56);
			$table57->setActions($tableDefinition57);
			$table58->setActions($tableDefinition58);
			$table59->setActions($tableDefinition59);
			$table60->setActions($tableDefinition60);
			$table61->setActions($tableDefinition61);
			$table62->setActions($tableDefinition62);
			$table63->setActions($tableDefinition63);
			$table64->setActions($tableDefinition64);
			$table65->setActions($tableDefinition65);
			$table66->setActions($tableDefinition66);
			$table67->setActions($tableDefinition67);
			$table68->setActions($tableDefinition68);
			$table69->setActions($tableDefinition69);
			$table70->setActions($tableDefinition70);
			$table71->setActions($tableDefinition71);
			$table72->setActions($tableDefinition72);
			$table73->setActions($tableDefinition73);
			$table74->setActions($tableDefinition74);
			$table75->setActions($tableDefinition75);
			$table76->setActions($tableDefinition76);
			$table77->setActions($tableDefinition77);
			$table78->setActions($tableDefinition78);
			$table79->setActions($tableDefinition79);
			$table80->setActions($tableDefinition80);
			$table81->setActions($tableDefinition81);
			$table82->setActions($tableDefinition82);
			$table83->setActions($tableDefinition83);
			$table84->setActions($tableDefinition84);
			$table85->setActions($tableDefinition85);
			$table86->setActions($tableDefinition86);
			$table87->setActions($tableDefinition87);
			$table88->setActions($tableDefinition88);
			$table89->setActions($tableDefinition89);
			$table90->setActions($tableDefinition90);
			$table91->setActions($tableDefinition91);
			$table92->setActions($tableDefinition92);
			$table93->setActions($tableDefinition93);
			$table94->setActions($tableDefinition94);
			$table95->setActions($tableDefinition95);
			$table96->setActions($tableDefinition96);
			$table97->setActions($tableDefinition97);
			$table98->setActions($tableDefinition98);
			$table99->setActions($tableDefinition99);
			$table100->setActions($tableDefinition100);
			$table101->setActions($tableDefinition101);
			$table102->setActions($tableDefinition102);
			$table103->setActions($tableDefinition103);
			$table104->setActions($tableDefinition104);
			$table105->setActions($tableDefinition105);
			$table106->setActions($tableDefinition106);
			$table107->setActions($tableDefinition107);
			$table108->setActions($tableDefinition108);
			$table109->setActions($tableDefinition109);
			$table110->setActions($tableDefinition110);
			$table111->setActions($tableDefinition111);
			$table112->setActions($tableDefinition112);
			$table113->setActions($tableDefinition113);
			$table114->setActions($tableDefinition114);
			$table115->setActions($tableDefinition115);
			$table116->setActions($tableDefinition116);
			$table117->setActions($tableDefinition117);
			$table118->setActions($tableDefinition118);
			$table119->setActions($tableDefinition119);
			$table120->setActions($tableDefinition120);
			$table121->setActions($tableDefinition121);
			$table122->setActions($tableDefinition122);
			$table123->setActions($tableDefinition123);
			$table124->setActions($tableDefinition124);
			$table125->setActions($tableDefinition125);
			$table126->setActions($tableDefinition126);
			$table127->setActions($tableDefinition127);
			$table128->setActions($tableDefinition128);
			$table129->setActions($tableDefinition129);
			$table130->setActions($tableDefinition130);
			$table131->setActions($tableDefinition131);
			$table132->setActions($tableDefinition132);
			$table133->setActions($tableDefinition133);
			$table134->setActions($tableDefinition134);
			$table135->setActions($tableDefinition135);
			$table136->setActions($tableDefinition136);
			$table137->setActions($tableDefinition137);
			$table138->setActions($tableDefinition138);
			$table139->setActions($tableDefinition139);
			$table140->setActions($tableDefinition140);
			$table141->setActions($tableDefinition141);
			$table142->setActions($tableDefinition142);
			$table143->setActions($tableDefinition143);
			$table144->setActions($tableDefinition144);
			$table145->setActions($tableDefinition145);
			$table146->setActions($tableDefinition146);
			$table147->setActions($tableDefinition147);
			$table148->setActions($tableDefinition148);

			$this->table = array(
				
					0=>$table0,
					1=>$table1,
					2=>$table2,
					3=>$table3,
					4=>$table4,
					5=>$table5,
					6=>$table6,
					7=>$table7,
					8=>$table8,
					9=>$table9,
					10=>$table10,
					11=>$table11,
					12=>$table12,
					13=>$table13,
					14=>$table14,
					15=>$table15,
					16=>$table16,
					17=>$table17,
					18=>$table18,
					19=>$table19,
					20=>$table20,
					21=>$table21,
					22=>$table22,
					23=>$table23,
					24=>$table24,
					25=>$table25,
					26=>$table26,
					27=>$table27,
					28=>$table28,
					29=>$table29,
					30=>$table30,
					31=>$table31,
					32=>$table32,
					33=>$table33,
					34=>$table34,
					35=>$table35,
					36=>$table36,
					37=>$table37,
					38=>$table38,
					39=>$table39,
					40=>$table40,
					41=>$table41,
					42=>$table42,
					43=>$table43,
					44=>$table44,
					45=>$table45,
					46=>$table46,
					47=>$table47,
					48=>$table48,
					49=>$table49,
					50=>$table50,
					51=>$table51,
					52=>$table52,
					53=>$table53,
					54=>$table54,
					55=>$table55,
					56=>$table56,
					57=>$table57,
					58=>$table58,
					59=>$table59,
					60=>$table60,
					61=>$table61,
					62=>$table62,
					63=>$table63,
					64=>$table64,
					65=>$table65,
					66=>$table66,
					67=>$table67,
					68=>$table68,
					69=>$table69,
					70=>$table70,
					71=>$table71,
					72=>$table72,
					73=>$table73,
					74=>$table74,
					75=>$table75,
					76=>$table76,
					77=>$table77,
					78=>$table78,
					79=>$table79,
					80=>$table80,
					81=>$table81,
					82=>$table82,
					83=>$table83,
					84=>$table84,
					85=>$table85,
					86=>$table86,
					87=>$table87,
					88=>$table88,
					89=>$table89,
					90=>$table90,
					91=>$table91,
					92=>$table92,
					93=>$table93,
					94=>$table94,
					95=>$table95,
					96=>$table96,
					97=>$table97,
					98=>$table98,
					99=>$table99,
					100=>$table100,
					101=>$table101,
					102=>$table102,
					103=>$table103,
					104=>$table104,
					105=>$table105,
					106=>$table106,
					107=>$table107,
					108=>$table108,
					109=>$table109,
					110=>$table110,
					111=>$table111,
					112=>$table112,
					113=>$table113,
					114=>$table114,
					115=>$table115,
					116=>$table116,
					117=>$table117,
					118=>$table118,
					119=>$table119,
					120=>$table120,
					121=>$table121,
					122=>$table122,
					123=>$table123,
					124=>$table124,
					125=>$table125,
					126=>$table126,
					127=>$table127,
					128=>$table128,
					129=>$table129,
					130=>$table130,
					131=>$table131,
					132=>$table132,
					133=>$table133,
					134=>$table134,
					135=>$table135,
					136=>$table136,
					137=>$table137,
					138=>$table138,
					139=>$table139,
					140=>$table140,
					141=>$table141,
					142=>$table142,
					143=>$table143,
					144=>$table144,
					145=>$table145,
					146=>$table146,
					147=>$table147,
					148=>$table148
				);

			$this->defaultActions = array(
				
					5=>new ParserAction($this->reduce, $table4),
					6=>new ParserAction($this->reduce, $table5),
					7=>new ParserAction($this->reduce, $table6),
					9=>new ParserAction($this->reduce, $table30),
					11=>new ParserAction($this->reduce, $table41),
					29=>new ParserAction($this->reduce, $table2),
					34=>new ParserAction($this->reduce, $table31),
					65=>new ParserAction($this->reduce, $table1),
					69=>new ParserAction($this->reduce, $table28),
					71=>new ParserAction($this->reduce, $table39)
				);

			$this->productions = array(
				
					0=>new ParserProduction($symbol0),
					1=>new ParserProduction($symbol3,3),
					2=>new ParserProduction($symbol3,2),
					3=>new ParserProduction($symbol5,1),
					4=>new ParserProduction($symbol5,1),
					5=>new ParserProduction($symbol5,1),
					6=>new ParserProduction($symbol5,1),
					7=>new ParserProduction($symbol11,2),
					8=>new ParserProduction($symbol14,3),
					9=>new ParserProduction($symbol17,3),
					10=>new ParserProduction($symbol17,1),
					11=>new ParserProduction($symbol20,4),
					12=>new ParserProduction($symbol20,1),
					13=>new ParserProduction($symbol24,3),
					14=>new ParserProduction($symbol24,1),
					15=>new ParserProduction($symbol27,1),
					16=>new ParserProduction($symbol27,1),
					17=>new ParserProduction($symbol7,1),
					18=>new ParserProduction($symbol7,3),
					19=>new ParserProduction($symbol29,2),
					20=>new ParserProduction($symbol29,1),
					21=>new ParserProduction($symbol31,2),
					22=>new ParserProduction($symbol31,1),
					23=>new ParserProduction($symbol34,4),
					24=>new ParserProduction($symbol37,3),
					25=>new ParserProduction($symbol37,1),
					26=>new ParserProduction($symbol38,4),
					27=>new ParserProduction($symbol38,1),
					28=>new ParserProduction($symbol39,3),
					29=>new ParserProduction($symbol39,1),
					30=>new ParserProduction($symbol8,1),
					31=>new ParserProduction($symbol40,2),
					32=>new ParserProduction($symbol40,1),
					33=>new ParserProduction($symbol9,5),
					34=>new ParserProduction($symbol44,3),
					35=>new ParserProduction($symbol46,3),
					36=>new ParserProduction($symbol46,1),
					37=>new ParserProduction($symbol47,4),
					38=>new ParserProduction($symbol47,1),
					39=>new ParserProduction($symbol48,3),
					40=>new ParserProduction($symbol48,1),
					41=>new ParserProduction($symbol10,1),
					42=>new ParserProduction($symbol16,1),
					43=>new ParserProduction($symbol16,1),
					44=>new ParserProduction($symbol13,1),
					45=>new ParserProduction($symbol13,1),
					46=>new ParserProduction($symbol52,1),
					47=>new ParserProduction($symbol52,3),
					48=>new ParserProduction($symbol53,1),
					49=>new ParserProduction($symbol53,3),
					50=>new ParserProduction($symbol53,3),
					51=>new ParserProduction($symbol36,1),
					52=>new ParserProduction($symbol36,3),
					53=>new ParserProduction($symbol36,3),
					54=>new ParserProduction($symbol56,3),
					55=>new ParserProduction($symbol56,3),
					56=>new ParserProduction($symbol19,1),
					57=>new ParserProduction($symbol19,1),
					58=>new ParserProduction($symbol19,1),
					59=>new ParserProduction($symbol19,1),
					60=>new ParserProduction($symbol19,2),
					61=>new ParserProduction($symbol19,2),
					62=>new ParserProduction($symbol19,3),
					63=>new ParserProduction($symbol19,3),
					64=>new ParserProduction($symbol19,3),
					65=>new ParserProduction($symbol19,3),
					66=>new ParserProduction($symbol19,3),
					67=>new ParserProduction($symbol19,3),
					68=>new ParserProduction($symbol19,3),
					69=>new ParserProduction($symbol19,3),
					70=>new ParserProduction($symbol19,3),
					71=>new ParserProduction($symbol19,3),
					72=>new ParserProduction($symbol19,3),
					73=>new ParserProduction($symbol19,3),
					74=>new ParserProduction($symbol19,1),
					75=>new ParserProduction($symbol19,3),
					76=>new ParserProduction($symbol19,1),
					77=>new ParserProduction($symbol19,1),
					78=>new ParserProduction($symbol19,1),
					79=>new ParserProduction($symbol73,3),
					80=>new ParserProduction($symbol73,4),
					81=>new ParserProduction($symbol77,1),
					82=>new ParserProduction($symbol77,3),
					83=>new ParserProduction($symbol23,1),
					84=>new ParserProduction($symbol23,1),
					85=>new ParserProduction($symbol79,1),
					86=>new ParserProduction($symbol79,3),
					87=>new ParserProduction($symbol80,2),
					88=>new ParserProduction($symbol80,2),
					89=>new ParserProduction($symbol80,1),
					90=>new ParserProduction($symbol26,1),
					91=>new ParserProduction($symbol26,3)
				);




        //Setup Lexer
        
			$this->rules = array(
				
					0=>"/^(?:\s+)/i",
					1=>"/^(?:[0-9]+\.[0-9]*|[0-9]*\.[0-9]+\b)/i",
					2=>"/^(?:[0-9]+)/i",
					3=>"/^(?:true|false\b)/i",
					4=>"/^(?:null\b)/i",
					5=>"/^(?:\"(\\[\"]|[^\"])*\")/i",
					6=>"/^(?:'(\\[']|[^'])*')/i",
					7=>"/^(?:select\b)/i",
					8=>"/^(?:update\b)/i",
					9=>"/^(?:insert\b)/i",
					10=>"/^(?:delete\b)/i",
					11=>"/^(?:remote\b)/i",
					12=>"/^(?:from\b)/i",
					13=>"/^(?:where\b)/i",
					14=>"/^(?:limit\b)/i",
					15=>"/^(?:union\b)/i",
					16=>"/^(?:as\b)/i",
					17=>"/^(?:set\b)/i",
					18=>"/^(?:delayed\b)/i",
					19=>"/^(?:order\b)/i",
					20=>"/^(?:by\b)/i",
					21=>"/^(?:random\b)/i",
					22=>"/^(?:asc\b)/i",
					23=>"/^(?:ascending\b)/i",
					24=>"/^(?:desc\b)/i",
					25=>"/^(?:descending\b)/i",
					26=>"/^(?:ignore\b)/i",
					27=>"/^(?:into\b)/i",
					28=>"/^(?:\()/i",
					29=>"/^(?:\))/i",
					30=>"/^(?:\*)/i",
					31=>"/^(?:\/)/i",
					32=>"/^(?:\+)/i",
					33=>"/^(?:-)/i",
					34=>"/^(?:!)/i",
					35=>"/^(?:<>)/i",
					36=>"/^(?:<=)/i",
					37=>"/^(?:<)/i",
					38=>"/^(?:>=)/i",
					39=>"/^(?:>)/i",
					40=>"/^(?:==)/i",
					41=>"/^(?:=)/i",
					42=>"/^(?:!=)/i",
					43=>"/^(?:~=)/i",
					44=>"/^(?:&&)/i",
					45=>"/^(?:and\b)/i",
					46=>"/^(?:\|\|)/i",
					47=>"/^(?:or\b)/i",
					48=>"/^(?:,)/i",
					49=>"/^(?:[A-Za-z_\$][A-Za-z0-9_]*)/i",
					50=>"/^(?:`[A-Za-z_\$][A-Za-z0-9_]*`)/i",
					51=>"/^(?::[A-Za-z_\$][A-Za-z0-9_]*)/i",
					52=>"/^(?:$)/i",
					53=>"/^(?:.)/i"
				);

			$this->conditions = array(
				
					"INITIAL"=>new LexerConditions(array( 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53), true)
				);


    }

    function parserPerformAction(&$thisS, &$yy, $yystate, &$s, $o)
    {
        
/* this == yyval */


switch ($yystate) {
case 1:

                                                                     JQL_AST::trace(302);
                                                               
break;
case 2:

                                                                     JQL_AST::trace(309);
                                                               
break;
case 3:

                                                                     JQL_AST::trace(317);
                                                               
break;
case 4:

                                                                     JQL_AST::trace(322);
                                                               
break;
case 5:

                                                                     JQL_AST::trace(327);
                                                               
break;
case 6:

                                                                     JQL_AST::trace(332);
                                                               
break;
case 7:

                                                                     JQL_AST::trace(344);
                                                               
break;
case 8:

                                                                     JQL_AST::trace(354);
                                                               
break;
case 9:

                                                                     JQL_AST::trace(363);
                                                               
break;
case 10:

                                                                    $thisS = $s[$o];
                                                                     JQL_AST::trace(367);
                                                               
break;
case 11:

                                                                     JQL_AST::trace(376);
                                                               
break;
case 12:

                                                                     JQL_AST::trace(381);
                                                               
break;
case 13:

                                                                     JQL_AST::trace(390);
                                                               
break;
case 14:

                                                                     JQL_AST::trace(395);
                                                               
break;
case 15:

                                                                     JQL_AST::trace(403);
                                                               
break;
case 16:

                                                                     JQL_AST::trace(408);
                                                               
break;
case 17:

                                                                     JQL_AST::trace(416);
                                                               
break;
case 18:

                                                                     JQL_AST::trace(422);
                                                               
break;
case 19:

                                                                     JQL_AST::trace(435);
                                                               
break;
case 20:

                                                                     JQL_AST::trace(442);
                                                               
break;
case 21:

                                                                     JQL_AST::trace(453);
                                                               
break;
case 22:

                                                                     JQL_AST::trace(461);
                                                               
break;
case 23:

                                                                     JQL_AST::trace(472);
                                                               
break;
case 24:

                                                                     JQL_AST::trace(481);
                                                               
break;
case 25:

                                                                     JQL_AST::trace(486);
                                                               
break;
case 26:

                                                                     JQL_AST::trace(496);
                                                               
break;
case 28:

                                                                     JQL_AST::trace(506);
                                                               
break;
case 29:

                                                                     JQL_AST::trace(511);
                                                               
break;
case 30:

                                                                     JQL_AST::trace(519);
                                                               
break;
case 31:

                                                                     JQL_AST::trace(531);
                                                               
break;
case 32:

                                                                     JQL_AST::trace(539);
                                                               
break;
case 33:

                                                                     JQL_AST::trace(550);
                                                               
break;
case 34:

                                                                     JQL_AST::trace(562);
                                                               
break;
case 35:

                                                                     JQL_AST::trace(571);
                                                               
break;
case 36:

                                                                    $thisS = $s[$o];
                                                                     JQL_AST::trace(575);
                                                               
break;
case 37:

                                                                     JQL_AST::trace(585);
                                                               
break;
case 38:

                                                                     JQL_AST::trace(590);
                                                               
break;
case 39:

                                                                     JQL_AST::trace(600);
                                                               
break;
case 40:

                                                                     JQL_AST::trace(605);
                                                               
break;
case 41:

                                                                     JQL_AST::trace(613);
                                                               
break;
case 42:

                                                                     JQL_AST::trace(624);
                                                               
break;
case 43:

                                                                     JQL_AST::trace(632);
                                                               
break;
case 44:

                                                                     JQL_AST::trace(643);
                                                               
break;
case 45:

                                                                     JQL_AST::trace(651);
                                                               
break;
case 46:

                                                                     JQL_AST::trace(659);
                                                               
break;
case 47:

                                                                     JQL_AST::trace(664);
                                                               
break;
case 48:

                                                                     JQL_AST::trace(676);
                                                               
break;
case 49:

                                                                     JQL_AST::trace(685);
                                                               
break;
case 50:

                                                                     JQL_AST::trace(694);
                                                               
break;
case 51:

                                                                     JQL_AST::trace(702);
                                                               
break;
case 52:

                                                                     JQL_AST::trace(707);
                                                               
break;
case 53:

                                                                     JQL_AST::trace(712);
                                                               
break;
case 54:

                                                                     JQL_AST::trace(724);
                                                               
break;
case 55:

                                                                     JQL_AST::trace(733);
                                                               
break;
case 56:

                                                                     JQL_AST::trace(745);
                                                               
break;
case 57:

                                                                     JQL_AST::trace(754);
                                                               
break;
case 58:

                                                                     JQL_AST::trace(762);
                                                               
break;
case 59:

                                                                     JQL_AST::trace(771);
                                                               
break;
case 60:

                                                                     JQL_AST::trace(782);
                                                               
break;
case 61:

                                                                     JQL_AST::trace(792);
                                                               
break;
case 62:

                                                                     JQL_AST::trace(804);
                                                               
break;
case 63:

                                                                     JQL_AST::trace(815);
                                                               
break;
case 64:

                                                                     JQL_AST::trace(827);
                                                               
break;
case 65:

                                                                     JQL_AST::trace(838);
                                                               
break;
case 66:

                                                                     JQL_AST::trace(849);
                                                               
break;
case 67:

                                                                     JQL_AST::trace(860);
                                                               
break;
case 68:

                                                                     JQL_AST::trace(871);
                                                               
break;
case 69:

                                                                     JQL_AST::trace(882);
                                                               
break;
case 70:

                                                                     JQL_AST::trace(894);
                                                               
break;
case 71:

                                                                     JQL_AST::trace(905);
                                                               
break;
case 72:

                                                                     JQL_AST::trace(916);
                                                               
break;
case 73:

                                                                     JQL_AST::trace(927);
                                                               
break;
case 74:

                                                                     JQL_AST::trace(932);
                                                               
break;
case 75:

                                                                     JQL_AST::trace(941);
                                                               
break;
case 76:

                                                                     JQL_AST::trace(950);
                                                               
break;
case 77:

                                                                     JQL_AST::trace(959);
                                                               
break;
case 78:

                                                                     JQL_AST::trace(968);
                                                               
break;
case 79:

                                                                     JQL_AST::trace(981);
                                                               
break;
case 80:

                                                                     JQL_AST::trace(991);
                                                               
break;
case 81:

                                                                     JQL_AST::trace(999);
                                                               
break;
case 82:

                                                                     JQL_AST::trace(1004);
                                                               
break;
case 83:

                                                                     JQL_AST::trace(1015);
                                                               
break;
case 84:

                                                                     JQL_AST::trace(1024);
                                                               
break;
case 85:

                                                                     JQL_AST::trace(1032);
                                                               
break;
case 86:

                                                                     JQL_AST::trace(1037);
                                                               
break;
case 87:

                                                                     JQL_AST::trace(1049);
                                                               
break;
case 88:

                                                                     JQL_AST::trace(1059);
                                                               
break;
case 89:

                                                                     JQL_AST::trace(1068);
                                                               
break;
case 90:

                                                                     JQL_AST::trace(1080);
                                                               
break;
case 91:

                                                                     JQL_AST::trace(1089);
                                                               
break;
}

    }

    function parserLex()
    {
        $token = $this->lexerLex(); // $end = 1

        if (isset($token)) {
            return $token;
        }

        return $this->symbols["end"];
    }

    function parseError($str = "", ParserError $hash = null)
    {
        throw new Exception($str);
    }

    function lexerError($str = "", LexerError $hash = null)
    {
        throw new Exception($str);
    }

    function parse($input)
    {
        if (empty($this->table)) {
            throw new Exception("Empty Table");
        }
        $this->eof = new ParserSymbol("Eof", 1);
        $firstAction = new ParserAction(0, $this->table[0]);
        $firstCachedAction = new ParserCachedAction($firstAction);
        $stack = array($firstCachedAction);
        $stackCount = 1;
        $vstack = array(null);
        $vstackCount = 1;
        $yy = null;
        $_yy = null;
        $recovering = 0;
        $symbol = null;
        $action = null;
        $errStr = "";
        $preErrorSymbol = null;
        $state = null;

        $this->setInput($input);

        while (true) {
            // retrieve state number from top of stack
            $state = $stack[$stackCount - 1]->action->state;
            // use default actions if available
            if ($state != null && isset($this->defaultActions[$state->index])) {
                $action = $this->defaultActions[$state->index];
            } else {
                if (empty($symbol) == true) {
                    $symbol = $this->parserLex();
                }
                // read action for current state and first input
                if (isset($state) && isset($state->actions[$symbol->index])) {
                    //$action = $this->table[$state][$symbol];
                    $action = $state->actions[$symbol->index];
                } else {
                    $action = null;
                }
            }

            if ($action == null) {
                if ($recovering == 0) {
                    // Report error
                    $expected = array();
                    foreach($this->table[$state->index]->actions as $p => $item) {
                        if (!empty($this->terminals[$p]) && $p > 2) {
                            $expected[] = $this->terminals[$p]->name;
                        }
                    }

                    $errStr = "Parse error on line " . ($this->yy->lineNo + 1) . ":\n" . $this->showPosition() . "\nExpecting " . implode(", ", $expected) . ", got '" . (isset($this->terminals[$symbol->index]) ? $this->terminals[$symbol->index]->name : 'NOTHING') . "'";

                    $this->parseError($errStr, new ParserError($this->match, $state, $symbol, $this->yy->lineNo, $this->yy->loc, $expected));
                }
            }

            if ($state === null || $action === null) {
                break;
            }

            switch ($action->action) {
                case 1:
                    // shift
                    //$this->shiftCount++;
                    $stack[] = new ParserCachedAction($action, $symbol);
                    $stackCount++;

                    $vstack[] = clone($this->yy);
                    $vstackCount++;

                    $symbol = "";
                    if ($preErrorSymbol == null) { // normal execution/no error
                        $yy = clone($this->yy);
                        if ($recovering > 0) $recovering--;
                    } else { // error just occurred, resume old look ahead f/ before error
                        $symbol = $preErrorSymbol;
                        $preErrorSymbol = null;
                    }
                    break;

                case 2:
                    // reduce
                    $len = $this->productions[$action->state->index]->len;
                    // perform semantic action
                    $_yy = $vstack[$vstackCount - $len];// default to $S = $1
                    // default location, uses first token for firsts, last for lasts

                    if (isset($this->ranges)) {
                        //TODO: add ranges
                    }

                    $r = $this->parserPerformAction($_yy->text, $yy, $action->state->index, $vstack, $vstackCount - 1);

                    if (isset($r)) {
                        return $r;
                    }

                    // pop off stack
                    while ($len > 0) {
                        $len--;

                        array_pop($stack);
                        $stackCount--;

                        array_pop($vstack);
                        $vstackCount--;
                    }

                    if (is_null($_yy))
                    {
                        $vstack[] = new ParserValue();
                    }
                    else
                    {
                        $vstack[] = $_yy;
                    }
                    $vstackCount++;

                    $nextSymbol = $this->productions[$action->state->index]->symbol;
                    // goto new state = table[STATE][NONTERMINAL]
                    $nextState = $stack[$stackCount - 1]->action->state;
                    $nextAction = $nextState->actions[$nextSymbol->index];

                    $stack[] = new ParserCachedAction($nextAction, $nextSymbol);
                    $stackCount++;

                    break;

                case 3:
                    // accept
                    return true;
            }

        }

        return true;
    }


    /* Jison generated lexer */
    public $eof;
    public $yy = null;
    public $match = "";
    public $matched = "";
    public $conditionStack = array();
    public $conditionStackCount = 0;
    public $rules = array();
    public $conditions = array();
    public $done = false;
    public $less;
    public $more;
    public $input;
    public $offset;
    public $ranges;
    public $flex = false;

    function setInput($input)
    {
        $this->input = $input;
        $this->more = $this->less = $this->done = false;
        $this->yy = new ParserValue();
        $this->conditionStack = array('INITIAL');
        $this->conditionStackCount = 1;

        if (isset($this->ranges)) {
            $loc = $this->yy->loc = new ParserLocation();
            $loc->Range(new ParserRange(0, 0));
        } else {
            $this->yy->loc = new ParserLocation();
        }
        $this->offset = 0;
    }

    function input()
    {
        $ch = $this->input[0];
        $this->yy->text .= $ch;
        $this->yy->leng++;
        $this->offset++;
        $this->match .= $ch;
        $this->matched .= $ch;
        $lines = preg_match("/(?:\r\n?|\n).*/", $ch);
        if (count($lines) > 0) {
            $this->yy->lineNo++;
            $this->yy->lastLine++;
        } else {
            $this->yy->loc->lastColumn++;
        }
        if (isset($this->ranges)) {
            $this->yy->loc->range->y++;
        }

        $this->input = array_slice($this->input, 1);
        return $ch;
    }

    function unput($ch)
    {
        $len = strlen($ch);
        $lines = explode("/(?:\r\n?|\n)/", $ch);
        $linesCount = count($lines);

        $this->input = $ch . $this->input;
        $this->yy->text = substr($this->yy->text, 0, $len - 1);
        //$this->yylen -= $len;
        $this->offset -= $len;
        $oldLines = explode("/(?:\r\n?|\n)/", $this->match);
        $oldLinesCount = count($oldLines);
        $this->match = substr($this->match, 0, strlen($this->match) - 1);
        $this->matched = substr($this->matched, 0, strlen($this->matched) - 1);

        if (($linesCount - 1) > 0) $this->yy->lineNo -= $linesCount - 1;
        $r = $this->yy->loc->range;
        $oldLinesLength = (isset($oldLines[$oldLinesCount - $linesCount]) ? strlen($oldLines[$oldLinesCount - $linesCount]) : 0);

        $this->yy->loc = new ParserLocation(
            $this->yy->loc->firstLine,
            $this->yy->lineNo,
            $this->yy->loc->firstColumn,
            $this->yy->loc->firstLine,
            (empty($lines) ?
                ($linesCount == $oldLinesCount ? $this->yy->loc->firstColumn : 0) + $oldLinesLength :
                $this->yy->loc->firstColumn - $len)
        );

        if (isset($this->ranges)) {
            $this->yy->loc->range = array($r[0], $r[0] + $this->yy->leng - $len);
        }
    }

    function more()
    {
        $this->more = true;
    }

    function pastInput()
    {
        $past = substr($this->matched, 0, strlen($this->matched) - strlen($this->match));
        return (strlen($past) > 20 ? '...' : '') . preg_replace("/\n/", "", substr($past, -20));
    }

    function upcomingInput()
    {
        $next = $this->match;
        if (strlen($next) < 20) {
            $next .= substr($this->input, 0, 20 - strlen($next));
        }
        return preg_replace("/\n/", "", substr($next, 0, 20) . (strlen($next) > 20 ? '...' : ''));
    }

    function showPosition()
    {
        $pre = $this->pastInput();

        $c = '';
        for($i = 0, $preLength = strlen($pre); $i < $preLength; $i++) {
            $c .= '-';
        }

        return $pre . $this->upcomingInput() . "\n" . $c . "^";
    }

    function next()
    {
        if ($this->done == true) {
            return $this->eof;
        }

        if (empty($this->input)) {
            $this->done = true;
        }

        if ($this->more == false) {
            $this->yy->text = '';
            $this->match = '';
        }

        $rules = $this->currentRules();
        for ($i = 0, $j = count($rules); $i < $j; $i++) {
            preg_match($this->rules[$rules[$i]], $this->input, $tempMatch);
            if ($tempMatch && (empty($match) || count($tempMatch[0]) > count($match[0]))) {
                $match = $tempMatch;
                $index = $i;
                if (isset($this->flex) && $this->flex == false) {
                    break;
                }
            }
        }
        if ( $match ) {
            $matchCount = strlen($match[0]);
            $lineCount = preg_match("/(?:\r\n?|\n).*/", $match[0], $lines);
            $line = ($lines ? $lines[$lineCount - 1] : false);
            $this->yy->lineNo += $lineCount;

            $this->yy->loc = new ParserLocation(
                $this->yy->loc->lastLine,
                $this->yy->lineNo + 1,
                $this->yy->loc->lastColumn,
                ($line ?
                    count($line) - preg_match("/\r?\n?/", $line, $na) :
                    $this->yy->loc->lastColumn + $matchCount
                )
            );


            $this->yy->text .= $match[0];
            $this->match .= $match[0];
            $this->matches = $match;
            $this->matched .= $match[0];

            $this->yy->leng = strlen($this->yy->text);
            if (isset($this->ranges)) {
                $this->yy->loc->range = new ParserRange($this->offset, $this->offset += $this->yy->leng);
            }
            $this->more = false;
            $this->input = substr($this->input, $matchCount, strlen($this->input));
            $ruleIndex = $rules[$index];
            $nextCondition = $this->conditionStack[$this->conditionStackCount - 1];

            $token = $this->lexerPerformAction($ruleIndex, $nextCondition);

            if ($this->done == true && empty($this->input) == false) {
                $this->done = false;
            }

            if (empty($token) == false) {
                return $this->symbols[
                $token
                ];
            } else {
                return null;
            }
        }

        if (empty($this->input)) {
            return $this->eof;
        } else {
            $this->lexerError("Lexical error on line " . ($this->yy->lineNo + 1) . ". Unrecognized text.\n" . $this->showPosition(), new LexerError("", -1, $this->yy->lineNo));
            return null;
        }
    }

    function lexerLex()
    {
        $r = $this->next();

        while (is_null($r) && !$this->done) {
            $r = $this->next();
        }

        return $r;
    }

    function begin($condition)
    {
        $this->conditionStackCount++;
        $this->conditionStack[] = $condition;
    }

    function popState()
    {
        $this->conditionStackCount--;
        return array_pop($this->conditionStack);
    }

    function currentRules()
    {
        $peek = $this->conditionStack[$this->conditionStackCount - 1];
        return $this->conditions[$peek]->rules;
    }

    function LexerPerformAction($avoidingNameCollisions, $YY_START = null)
    {
        
;
switch($avoidingNameCollisions) {
case 0:/* ignore whitespace */
break;
case 1:return 33;
break;
case 2:return 33;
break;
case 3:return 58;
break;
case 4:return 59;
break;
case 5:return 60;
break;
case 6:return 60;
break;
case 7:return 12;
break;
case 8:return 30;
break;
case 9:return 41;
break;
case 10:return 45;
break;
case 11:return 4;
break;
case 12:return 15;
break;
case 13:return 18;
break;
case 14:return 25;
break;
case 15:return 28;
break;
case 16:return 55;
break;
case 17:return 35;
break;
case 18:return 32;
break;
case 19:return 21;
break;
case 20:return 22;
break;
case 21:return 78;
break;
case 22:return 81;
break;
case 23:return 81;
break;
case 24:return 82;
break;
case 25:return 82;
break;
case 26:return 42;
break;
case 27:return 43;
break;
case 28:return 74;
break;
case 29:return 75;
break;
case 30:return 51;
break;
case 31:return 71;
break;
case 32:return 72;
break;
case 33:return 62;
break;
case 34:return 61;
break;
case 35:return '!=';
break;
case 36:return 67;
break;
case 37:return 68;
break;
case 38:return 69;
break;
case 39:return 70;
break;
case 40:return 65;
break;
case 41:return 57;
break;
case 42:return '!=';
break;
case 43:return 66;
break;
case 44:return 64;
break;
case 45:return 64;
break;
case 46:return 63;
break;
case 47:return 63;
break;
case 48:return 54;
break;
case 49:return 49;
break;
case 50:return 50;
break;
case 51:return 76;
break;
case 52:return 6;
break;
case 53:return 'INVALID';
break;
}

    }
}

class ParserLocation
{
    public $firstLine = 1;
    public $lastLine = 0;
    public $firstColumn = 1;
    public $lastColumn = 0;
    public $range;

    public function __construct($firstLine = 1, $lastLine = 0, $firstColumn = 1, $lastColumn = 0)
    {
        $this->firstLine = $firstLine;
        $this->lastLine = $lastLine;
        $this->firstColumn = $firstColumn;
        $this->lastColumn = $lastColumn;
    }

    public function Range($range)
    {
        $this->range = $range;
    }

    public function __clone()
    {
        return new ParserLocation($this->firstLine, $this->lastLine, $this->firstColumn, $this->lastColumn);
    }
}

class ParserValue
{
    public $leng = 0;
    public $loc;
    public $lineNo = 0;
    public $text;
    public $result = null;

    function __clone() {
        $clone = new ParserValue();
        $clone->leng = $this->leng;
        if (isset($this->loc)) {
            $clone->loc = clone $this->loc;
        }
        $clone->lineNo = $this->lineNo;
        $clone->text = $this->text;
        return $clone;
    }
}

class LexerConditions
{
    public $rules;
    public $inclusive;

    function __construct($rules, $inclusive)
    {
        $this->rules = $rules;
        $this->inclusive = $inclusive;
    }
}

class ParserProduction
{
    public $len = 0;
    public $symbol;

    public function __construct($symbol, $len = 0)
    {
        $this->symbol = $symbol;
        $this->len = $len;
    }
}

class ParserCachedAction
{
    public $action;
    public $symbol;

    function __construct($action, $symbol = null)
    {
        $this->action = $action;
        $this->symbol = $symbol;
    }
}

class ParserAction
{
    public $action;
    public $state;
    public $symbol;

    function __construct($action, &$state = null, &$symbol = null)
    {
        $this->action = $action;
        $this->state = $state;
        $this->symbol = $symbol;
    }
}

class ParserSymbol
{
    public $name;
    public $index = -1;
    public $symbols = array();
    public $symbolsByName = array();

    function __construct($name, $index)
    {
        $this->name = $name;
        $this->index = $index;
    }

    public function addAction($a)
    {
        $this->symbols[$a->index] = $this->symbolsByName[$a->name] = $a;
    }
}

class ParserError
{
    public $text;
    public $state;
    public $symbol;
    public $lineNo;
    public $loc;
    public $expected;

    function __construct($text, $state, $symbol, $lineNo, $loc, $expected)
    {
        $this->text = $text;
        $this->state = $state;
        $this->symbol = $symbol;
        $this->lineNo = $lineNo;
        $this->loc = $loc;
        $this->expected = $expected;
    }
}

class LexerError
{
    public $text;
    public $token;
    public $lineNo;

    public function __construct($text, $token, $lineNo)
    {
        $this->text = $text;
        $this->token = $token;
        $this->lineNo = $lineNo;
    }
}

class ParserState
{
    public $index;
    public $actions = array();

    function __construct($index)
    {
        $this->index = $index;
    }

    public function setActions(&$actions)
    {
        $this->actions = $actions;
    }
}

class ParserRange
{
    public $x;
    public $y;

    function __construct($x, $y)
    {
        $this->x = $x;
        $this->y = $y;
    }
}