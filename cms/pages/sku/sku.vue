<template>
	<div>
		<div class="stand">
			<ul style="list-style-type:none;">
				<!-- <span @click="remove(index)">删除:</span> -->
				<li class="attr" v-for="(item,index) in standData" :key="index">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark">
								<el-input class="title" v-model="item.title" placeholder="请输入属性">:</el-input>
							</div>
						</el-col>
					</el-row>
					<div class="putt" v-if="item.attrs.length" v-for="(subitem,i) in item.attrs" :key="i">
						<el-input v-model="subitem.attr" placeholder="请输入值"></el-input>
						<div class="close" @click="closeAtrr(index,i)">×</div>
					</div>
					<div class="append" @click="addAtrr(index)">+</div>
				</li>
			</ul>
			<div class="add">
				<el-button type="primary" @click="addStand">添加规格</el-button>
				<el-button type="primary" @click="getTable">生成规格列表</el-button>
				<el-button type="primary" @click="read">读取规格列表</el-button>
			</div>
		</div>
		<div class="table">
			<el-table v-if="isTable" :data="tableData" border style="width: 100%">
				<el-table-column prop="date" label="属性" width="180">
				</el-table-column>
				<el-table-column prop="name" label="价格1" width="180">
				</el-table-column>
				<el-table-column prop="address" label="价格2">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				input: '',
				isTable: false,
				standData: [],
				list: [],
				group: []
			}
		},
		methods: {
			addStand(i) {
				//  限制规格种类不超过4种
				if (this.standData.length > 3) {
					this.$message('不能超过四行')
				} else {
					this.standData.push({
						title: '',
						attrs: []
					})
				}
			},
			// 添加规格表格
			// getTable() {
			// 	this.isTable = true
			// 	this.tableData = []
			// 	this.group = []
			// 	this.list = []
			// 	//   console.log(this.standData);
			// 	const num = this.standData.length
			// 	this.standData.forEach(item => {
			// 		this.list.push(item.attrs)
			// 	});
			// 	//   console.log(this.list);
			// 	var arr = []
			// 	var that = this

			// 	function func(skuarr = [], i) {
			// 		for (let j = 0; j < that.list[i].length; j++) {
			// 			if (i < that.list.length - 1) {
			// 				skuarr[i] = that.list[i][j].attr
			// 				func(skuarr, i + 1)
			// 			} else {
			// 				arr.push([...skuarr, that.list[i][j].attr])
			// 			}
			// 		}
			// 		return arr
			// 	}
			// 	let newList = func([], 0)
			// 	let b
			// 	newList.forEach(item => {
			// 		b = ''
			// 		for (let i = 0; i < num; i++) {
			// 			let a = this.standData[i].title
			// 			a = a + ':' + item[i]
			// 			b = b + a + ';'
			// 		}
			// 		this.group.push(b)
			// 	})
			// 	console.log(this.group)
			// 	let table = []
			// 	for (let j = 0; j < this.group.length; j++) {
			// 		table.push({
			// 			date: this.group[j],
			// 			name: '',
			// 			address: ''
			// 		})
			// 	}
			// 	this.tableData = table
			// },

			// 删除规格行
			remove(i) {
				this.standData.splice(i, 1)
			},
			// 添加属性值
			addAtrr(i) {
				//  限制属性值不超过5个
				if (this.standData[i].attrs.length > 4) {
					this.$message('不能超过5个')
				} else {
					// 存的时候是存的对象
					this.standData[i].attrs.push({
						attr: ''
					})
				}
			},
			// 删除属性值
			closeAtrr(a, b) {
				//   console.log(a, b);
				this.standData[a].attrs.splice(b, 1)
			},
			// 读取规格属性数组
			read() {
				// 如果后台返回的数据是这样的
				const arr = [
					'颜色:红色;尺码:M;品质:好;',
					'颜色:红色;尺码:S;品质:好;',
					'颜色:白色;尺码:M;品质:好;',
					'颜色:白色;尺码:S;品质:好;'
				]
				const a = arr[0].split(';')
				const num = a.length - 1
				let ss = []
				for (let tt = 0; tt < num; tt++) {
					ss.push([])
				}

				arr.forEach(item => {
					for (let tt = 0; tt < num; tt++) {
						ss[tt].push(item.split(';')[tt].split(':')[1])
					}
				})
				ss = ss.map(item => {
					return Array.from(new Set(item))
				})
				for (let s = 0; s < ss.length; s++) {
					for (let t = 0; t < ss[s].length; t++) {
						ss[s][t] = {
							attr: ss[s][t]
						}
					}
				}
				for (let i = 0; i < num; i++) {
					this.standData.push({
						'title': a[i].split(':')[0],
						attrs: ss[i]
					})
				}
				console.log(this.standData);

			}
		}
	}
</script>

<style>
	.table,
	.stand {
		padding: 40px;
	}

	.table {
		height: 500px;
	}

	.add {
		margin-top: 20px;
	}

	.attr {
		margin-bottom: 10px;
	}

	.el-input {
		width: auto;

	}

	.putt {
		display: inline-block;
		position: relative;
		margin-left: 15px;
		margin-top: 10px;
	}

	.append {
		width: 40px;
		height: 40px;
		background-color: aqua;
		line-height: 40px;
		text-align: center;
		display: inline-block;
		font-size: 28px;
		cursor: pointer;
		vertical-align: middle;
	}

	.title {
		background-color: bisque;
		margin-right: 10px;
		margin-top: 5px;
		height: 35px;
		line-height: 35px;
	}

	.close {
		position: absolute;
		width: 15px;
		height: 15px;
		background-color: burlywood;
		border-radius: 50%;
		line-height: 15px;
		text-align: center;
		right: -5px;
		top: -5px;
	}

	.bg-purple-dark {
		background: #f8f8f8;
		padding-left: 15px;
		font-size: 12px;
		height: 50px;

		.el-input__inner {
			height: 30px;
			line-height: 30px;
		}
	}
</style>
