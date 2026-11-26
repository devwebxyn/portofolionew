import assert from "node:assert/strict";
import test from "node:test";
import { ohm, rc, solenoid, transformer, rectified, channelOn, logic, protection, fuseState } from "../frontend/src/lib/circuit-models.ts";

const near = (actual, expected) => assert.ok(Math.abs(actual-expected)<1e-9, `${actual} != ${expected}`);

test("DC models scale current and power correctly",()=>{
  assert.deepEqual(ohm(5,100),{amps:.05,watts:.25});
  assert.deepEqual(ohm(5,200),{amps:.025,watts:.125});
  assert.deepEqual(ohm(0,20),{amps:0,watts:0});
});

test("RC start, time constant, and approach to steady state",()=>{
  near(rc(5,0,1000,100e-6,false),0);
  near(rc(5,0,1000,100e-6,true),5);
  near(rc(5,.1,1000,100e-6,false),5*(1-Math.exp(-1)));
  near(rc(5,.1,1000,100e-6,true),5*Math.exp(-1));
  assert.ok(rc(5,1,1000,100e-6,false)>4.99);
});

test("Air core field changes sign and scales with turns and current",()=>{
  near(solenoid(0,100,.15),0);
  near(solenoid(-.5,60,.15),-solenoid(.5,60,.15));
  near(solenoid(1,120,.15),4*solenoid(.5,60,.15));
});

test("Transformer ratio and center tap use the complete secondary",()=>{
  near(transformer(6,100,50,false),3);
  near(transformer(6,100,50,true),1.5);
  near(transformer(6,100,200,false),12);
});

test("Ideal diode and full bridge respond to both half cycles",()=>{
  near(rectified(Math.PI/2,5,false),5);
  near(rectified(3*Math.PI/2,5,false),0);
  near(rectified(3*Math.PI/2,5,true),5);
  near(rectified(Math.PI,5,true),0);
});

test("Gate polarity is relative to source and protection requires control",()=>{
  assert.equal(channelOn(3,0,false),true);
  assert.equal(channelOn(2,0,false),false);
  assert.equal(channelOn(0,5,true),true);
  assert.equal(channelOn(5,5,true),false);
  assert.equal(protection("short").isolated,false);
  assert.equal(protection("detect").detection,true);
  assert.equal(protection("isolate").gate,5);
  assert.equal(protection("isolate").isolated,true);
  assert.equal(protection("normal").shorted,false);
});

test("Fuse and eFuse can conduct during fault before isolation",()=>{
  assert.deepEqual(fuseState("efuse",true,false),{conducting:true,text:"Pembatasan arus elektronik"});
  assert.equal(fuseState("efuse",true,true).conducting,false);
  assert.deepEqual(fuseState("fuse",true,true),{conducting:false,text:"Elemen putus"});
});

test("Logic truth tables match all four input pairs",()=>{
  const table={AND:"0001",OR:"0111",NOT:"1100",NAND:"1110",NOR:"1000",XOR:"0110",XNOR:"1001"};
  for (const [gate,expected] of Object.entries(table)) {
    const actual=[false,true].flatMap(a=>[false,true].map(b=>Number(logic(gate,a,b)))).join("");
    assert.equal(actual,expected,gate);
  }
});
