#cd /u/m/spgriskdev/morriste/p4v2/
#start up p4
#module load 3rd/perforce/spstrat
#export P4CLIENT=morriste_unix
#p4 login -a
#p4 sync
#run server
#cd  /u/m/spgriskdev/morriste/p4v2
#module load msjs/node/4.4.0
#node ccrt-trunk.js

cd /u/m/spgriskdev/morriste/p4v2/fidstrattools/ccrt_mt/trunk/scripts
export PORT=1214 #qa port
./runLayoutManager.ksh dev


#go to qa

#dist

/u/m/spgriskdev/morriste/p4/spg/spgrt/ui/qa/

suu -r  mbsoas -t mbsoas
#go to branch
 cd
dist.ksh qa



#makedate

