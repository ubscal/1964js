/*
1964js - JavaScript/HTML5 port of 1964 - N64 emulator
Copyright (C) 2012 Joel Middendorf

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

var CPU_instruction =
[
	'instr', //0
	'REGIMM_instr', //1
	'r4300i_j', //2
	'r4300i_jal',		//3
	'r4300i_beq',		//4
	'r4300i_bne',		//5
	'r4300i_blez',	//6
	'r4300i_bgtz',	//7
	'r4300i_addi',	//8
	'r4300i_addiu',	//9
	'r4300i_slti',	//10
	'r4300i_sltiu',	//11
	'r4300i_andi',	//12
	'r4300i_ori',		//13
	'r4300i_xori',	//14
	'r4300i_lui',		//15
	'COP0_instr',		//16
	'COP1_instr',		//17
	'UNUSED',			//18
	'UNUSED',			//19
	'r4300i_beql',	//20
	'r4300i_bnel',	//21
	'r4300i_blezl',	//22
	'r4300i_bgtzl',	//23
	'r4300i_daddi',	//24
	'r4300i_daddiu',	//25
	'r4300i_ldl',		//26
	'r4300i_ldr',		//27
	'UNUSED',			//28
	'UNUSED',			//29
	'UNUSED',			//30
	'UNUSED',			//31
	'r4300i_lb',		//32
	'r4300i_lh',		//33
	'r4300i_lwl',		//34
	'r4300i_lw',		//35
	'r4300i_lbu',		//36
	'r4300i_lhu',		//37
	'r4300i_lwr',		//38
	'r4300i_lwu',		//39
	'r4300i_sb',		//40
	'r4300i_sh',		//41
	'r4300i_swl',		//42
	'r4300i_sw',		//43
	'r4300i_sdl',		//44
	'r4300i_sdr',		//45
	'r4300i_swr',		//46
	'r4300i_cache',	//47
	'r4300i_ll',		//48
	'r4300i_lwc1',	//49
	'UNUSED',			//50
	'UNUSED',			//51
	'r4300i_lld',		//52
	'r4300i_ldc1',	//53
	'UNUSED',			//54
	'r4300i_ld',		//55
	'r4300i_sc',		//56
	'r4300i_swc1',	//57
	'UNUSED',			//58
	'UNUSED',			//59
	'r4300i_scd',		//60
	'r4300i_sdc1',	//61
	'UNUSED',			//62
	'r4300i_sd'		//63
];

var r4300i_Instruction =
[
	'r4300i_sll',		//0
	'UNUSED',			//1
	'r4300i_srl',		//2
	'r4300i_sra',		//3
	'r4300i_sllv',	//4
	'UNUSED',			//5
	'r4300i_srlv',	//6
	'r4300i_srav',	//7
	'r4300i_jr',		//8
	'r4300i_jalr',	//9
	'UNUSED',			//10
	'UNUSED',			//11
	'r4300i_syscall',	//12
	'r4300i_break',	//13
	'UNUSED',			//14
	'r4300i_sync',	//15
	'r4300i_mfhi',	//16
	'r4300i_mthi',	//17
	'r4300i_mflo',	//18
	'r4300i_mtlo',	//19
	'r4300i_dsllv',	//20
	'UNUSED',			//21
	'r4300i_dsrlv',	//22
	'r4300i_dsrav',	//23
	'r4300i_mult',	//24
	'r4300i_multu',	//25
	'r4300i_div',		//26
	'r4300i_divu',	//27
	'r4300i_dmult',	//28
	'r4300i_dmultu',	//29
	'r4300i_ddiv',	//30
	'r4300i_ddivu',	//31
	'r4300i_add',		//32
	'r4300i_addu',	//33
	'r4300i_sub',		//34
	'r4300i_subu',	//35
	'r4300i_and',		//36
	'r4300i_or',		//37
	'r4300i_xor',		//38
	'r4300i_nor',		//39
	'UNUSED',			//40
	'UNUSED',			//41
	'r4300i_slt',		//42
	'r4300i_sltu',	//43
	'r4300i_dadd',	//44
	'r4300i_daddu',	//45
	'r4300i_dsub',	//46
	'r4300i_dsubu',	//47
	'r4300i_tge',		//48
	'r4300i_tgeu',	//49
	'r4300i_tlt',		//50
	'r4300i_tltu',	//51
	'r4300i_teq',		//52
	'UNUSED',			//53
	'r4300i_tne',		//54
	'UNUSED',			//55
	'r4300i_dsll',	//56
	'UNUSED',			//57
	'r4300i_dsrl',	//58
	'r4300i_dsra',	//59
	'r4300i_dsll32',	//60
	'UNUSED',			//61
	'r4300i_dsrl32',	//62
	'r4300i_dsra32'	//63
];

var REGIMM_Instruction =
[
	'r4300i_bltz',
	'r4300i_bgez',
	'r4300i_bltzl',
	'r4300i_bgezl',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_tgei',
	'r4300i_tgeiu',
	'r4300i_tlti',
	'r4300i_tltiu',
	'r4300i_teqi',
	'UNUSED',
	'r4300i_tnei',
	'UNUSED',
	'r4300i_bltzal',
	'r4300i_bgezal',
	'r4300i_bltzall',
	'r4300i_bgezall',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED'
];

var COP0_Instruction =
[
	'r4300i_COP0_mfc0',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_COP0_mtc0',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'TLB_instr',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED'
];

var TLB_Instruction =
[
	'UNUSED',				//0
	'r4300i_COP0_tlbr',	//1
	'r4300i_COP0_tlbwi',	//2
	'UNUSED',				//3
	'UNUSED',				//4
	'UNUSED',				//5
	'r4300i_COP0_tlbwr',	//6
	'UNUSED',				//7
	'r4300i_COP0_tlbp',	//8
	'UNUSED',				//9
	'UNUSED',				//10
	'UNUSED',				//11
	'UNUSED',				//12
	'UNUSED',				//13
	'UNUSED',				//14
	'UNUSED',				//15
	'UNUSED',				//16
	'UNUSED',				//17
	'UNUSED',				//18
	'UNUSED',				//19
	'UNUSED',				//20
	'UNUSED',				//21
	'UNUSED',				//22
	'UNUSED',				//23
	'r4300i_COP0_eret',	//24
	'UNUSED',				//25
	'UNUSED',				//26
	'UNUSED',				//27
	'UNUSED',				//28
	'UNUSED',				//29
	'UNUSED',				//30
	'UNUSED',				//31
	'UNUSED',				//32
	'UNUSED',				//33
	'UNUSED',				//34
	'UNUSED',				//35
	'UNUSED',				//36
	'UNUSED',				//37
	'UNUSED',				//38
	'UNUSED',				//39
	'UNUSED',				//40
	'UNUSED',				//41
	'UNUSED',				//42
	'UNUSED',				//43
	'UNUSED',				//44
	'UNUSED',				//45
	'UNUSED',				//46
	'UNUSED',				//47
	'UNUSED',				//48
	'UNUSED',				//49
	'UNUSED',				//50
	'UNUSED',				//51
	'UNUSED',				//52
	'UNUSED',				//53
	'UNUSED',				//54
	'UNUSED',				//55
	'UNUSED',				//56
	'UNUSED',				//57
	'UNUSED',				//58
	'UNUSED',				//59
	'UNUSED',				//60
	'UNUSED',				//61
	'UNUSED',				//62
	'UNUSED' 				//63
];

var COP1_Instruction =
[
	'r4300i_COP1_mfc1',
	'r4300i_COP1_dmfc1',
	'r4300i_COP1_cfc1',
	'UNUSED',
	'r4300i_COP1_mtc1',
	'r4300i_COP1_dmtc1',
	'r4300i_COP1_ctc1',
	'UNUSED',
	'COP1_BC_instr',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'COP1_S_instr',
	'COP1_D_instr',
	'UNUSED',
	'UNUSED',
	'COP1_W_instr', //20
	'COP1_L_instr',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED'
];

var COP1_BC_Instruction =
[
	'r4300i_COP1_bc1f', 'r4300i_COP1_bc1t', 'r4300i_COP1_bc1fl', 'r4300i_COP1_bc1tl', 'UNUSED', 'UNUSED', 'UNUSED', 'UNUSED',
	'UNUSED',           'UNUSED',           'UNUSED',            'UNUSED',            'UNUSED', 'UNUSED', 'UNUSED', 'UNUSED',
	'UNUSED',           'UNUSED',           'UNUSED',            'UNUSED',            'UNUSED', 'UNUSED', 'UNUSED', 'UNUSED',
	'UNUSED',           'UNUSED',           'UNUSED',            'UNUSED',            'UNUSED', 'UNUSED', 'UNUSED', 'UNUSED'
];

var COP1_S_Instruction =
[
	'r4300i_COP1_add_s',
	'r4300i_COP1_sub_s',
	'r4300i_COP1_mul_s',
	'r4300i_COP1_div_s',
	'r4300i_COP1_sqrt_s',
	'r4300i_COP1_abs_s',
	'r4300i_COP1_mov_s',
	'r4300i_COP1_neg_s',
	'r4300i_COP1_roundl_s',
	'r4300i_COP1_truncl_s',
	'r4300i_COP1_ceill_s',
	'r4300i_COP1_floorl_s',
	'r4300i_COP1_roundw_s',
	'r4300i_COP1_truncw_s',
	'r4300i_COP1_ceilw_s',
	'r4300i_COP1_floorw_s',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_COP1_cvtd_s',
	'UNUSED',
	'UNUSED',
	'r4300i_COP1_cvtw_s',
	'r4300i_COP1_cvtl_s',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_C_F_S',
	'r4300i_C_UN_S',
	'r4300i_C_EQ_S',
	'r4300i_C_UEQ_S',
	'r4300i_C_OLT_S',
	'r4300i_C_ULT_S',
	'r4300i_C_OLE_S',
	'r4300i_C_ULE_S',
	'r4300i_C_SF_S',
	'r4300i_C_NGLE_S',
	'r4300i_C_SEQ_S',
	'r4300i_C_NGL_S',
	'r4300i_C_LT_S',
	'r4300i_C_NGE_S',
	'r4300i_C_LE_S',
	'r4300i_C_NGT_S'
];

var COP1_D_Instruction =
[
	'r4300i_COP1_add_d',
	'r4300i_COP1_sub_d',
	'r4300i_COP1_mul_d',
	'r4300i_COP1_div_d',
	'r4300i_COP1_sqrt_d',
	'r4300i_COP1_abs_d',
	'r4300i_COP1_mov_d',
	'r4300i_COP1_neg_d',
	'r4300i_COP1_roundl_d',
	'r4300i_COP1_truncl_d',
	'r4300i_COP1_ceill_d',
	'r4300i_COP1_floorl_d',
	'r4300i_COP1_roundw_d',
	'r4300i_COP1_truncw_d',
	'r4300i_COP1_ceilw_d',
	'r4300i_COP1_floorw_d',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_COP1_cvts_d',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_COP1_cvtw_d',
	'r4300i_COP1_cvtl_d',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_C_F_D',
	'r4300i_C_UN_D',
	'r4300i_C_EQ_D',
	'r4300i_C_UEQ_D',
	'r4300i_C_OLT_D',
	'r4300i_C_ULT_D',
	'r4300i_C_OLE_D',
	'r4300i_C_ULE_D',
	'r4300i_C_SF_D',
	'r4300i_C_NGLE_D',
	'r4300i_C_SEQ_D',
	'r4300i_C_NGL_D',
	'r4300i_C_LT_D',
	'r4300i_C_NGE_D',
	'r4300i_C_LE_D',
	'r4300i_C_NGT_D'
];

var COP1_W_Instruction =
[
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_COP1_cvts_w',
	'r4300i_COP1_cvtd_w',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED'
];

var COP1_L_Instruction =
[
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'r4300i_COP1_cvts_l',
	'r4300i_COP1_cvtd_l',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED',
	'UNUSED'
];

function instr(i, isDelay)
{
	return window[r4300i_Instruction[fn(i)]](i, isDelay);
}

function REGIMM_instr(i, isDelay)
{
	return window[REGIMM_Instruction[rt(i)]](i, isDelay);
}

function COP0_instr(i, isDelay)
{
	return window[COP0_Instruction[rs(i)]](i, isDelay);
}

function COP1_instr(i, isDelay)
{
	return window[COP1_Instruction[rs(i)]](i, isDelay);
}

function TLB_instr(i, isDelay)
{
	return window[TLB_Instruction[fn(i)]](i, isDelay);
}

function COP1_BC_instr(i, isDelay)
{
	return window[COP1_BC_Instruction[rt(i)]](i, isDelay);
}

function COP1_S_instr(i, isDelay)
{
	return window[COP1_S_Instruction[fn(i)]](i, isDelay);
}

function COP1_D_instr(i, isDelay)
{
	return window[COP1_D_Instruction[fn(i)]](i, isDelay);
}

function COP1_W_instr(i, isDelay)
{
	return window[COP1_W_Instruction[fn(i)]](i, isDelay);
}

function COP1_L_instr(i, isDelay)
{
	return window[COP1_L_Instruction[fn(i)]](i, isDelay);
}

var microcodeMap0 =
[
	'RSP_GBI1_SpNoop', 'RSP_GBI0_Mtx', 'RSP_GBI1_Reserved', 'RSP_GBI1_MoveMem',
	'RSP_GBI0_Vtx', 'RSP_GBI1_Reserved', 'RSP_GBI0_DL', 'RSP_GBI1_Reserved',
	'RSP_GBI1_Reserved', 'RSP_GBI0_Sprite2DBase', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//10
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//20
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//30
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//40
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//50
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//60
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//70
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//80
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//90
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//a0
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//b0
	'RSP_RDP_Nothing', 'RSP_GBI0_Tri4', 'RSP_GBI1_RDPHalf_Cont', 'RSP_GBI1_RDPHalf_2',
	'RSP_GBI1_RDPHalf_1', 'RSP_GBI1_Line3D', 'RSP_GBI1_ClearGeometryMode', 'RSP_GBI1_SetGeometryMode',
	'RSP_GBI1_EndDL', 'RSP_GBI1_SetOtherModeL', 'RSP_GBI1_SetOtherModeH', 'RSP_GBI1_Texture',
	'RSP_GBI1_MoveWord', 'RSP_GBI1_PopMtx', 'RSP_GBI1_CullDL', 'RSP_GBI1_Tri1',
//c0
	'RSP_GBI1_Noop', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RDP_TriFill', 'RDP_TriFillZ', 'RDP_TriTxtr', 'RDP_TriTxtrZ',
	'RDP_TriShade', 'RDP_TriShadeZ', 'RDP_TriShadeTxtr', 'RDP_TriShadeTxtrZ',
//d0
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
//e0
	'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing', 'RSP_RDP_Nothing',
	'DLParser_TexRect', 'DLParser_TexRectFlip', 'DLParser_RDPLoadSync', 'DLParser_RDPPipeSync',
	'DLParser_RDPTileSync', 'DLParser_RDPFullSync', 'DLParser_SetKeyGB', 'DLParser_SetKeyR',
	'DLParser_SetConvert', 'DLParser_SetScissor', 'DLParser_SetPrimDepth', 'DLParser_RDPSetOtherMode',
//f0
	'DLParser_LoadTLut', 'RSP_RDP_Nothing', 'DLParser_SetTileSize', 'DLParser_LoadBlock',
	'DLParser_LoadTile', 'DLParser_SetTile', 'DLParser_FillRect', 'DLParser_SetFillColor',
	'DLParser_SetFogColor', 'DLParser_SetBlendColor', 'DLParser_SetPrimColor', 'DLParser_SetEnvColor',
	'DLParser_SetCombine', 'DLParser_SetTImg', 'DLParser_SetZImg', 'DLParser_SetCImg'
];